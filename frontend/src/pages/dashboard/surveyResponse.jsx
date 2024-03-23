import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
 Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
    Input,
    Button,
  IconButton,  
  CardFooter
} from "@material-tailwind/react";
import httpClient from "@/configs/httpClient";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import {  EyeIcon } from "@heroicons/react/24/solid";

export function SurveyResponse() {

  const [responseData, setResponseData] = useState([]);
    const [limit, setLimit] = useState(10);
    const [active, setActive] = useState(1);
    const [open, setOpen] = React.useState(false);
  const [rowData, setRowdData] = useState({})
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
 
    const handleOpen = async (key) => {
        const baseUrl = "//localhost:8080/api/survey-responses";
        const res = await httpClient.get(`${baseUrl}?id=${key}`);
        setRowdData(res.data.responses[0]);
        console.log(rowData);
        setOpen(true);
    };
    
    const handleClose = () => setOpen(false);


   const getItemProps = (index) =>
    ({
      variant: active === index ? "filled" : "text",
      color: "gray",
      onClick: () => setActive(index),
  });
  
  const next = () => {
    if (active === 5) return;
    setActive(active + 1);
  };
 
  const prev = () => {
    if (active === 1) return;
 
    setActive(active - 1);
  };

  const handleClearFilter = () => {
    console.log("clearing")
    setSearchEmail("");
    setSearchStatus("");
    setFromDate("");
    setToDate("");
  }

    useEffect(() => {
    (async () => {
      try {
        console.log({ fromDate, toDate });
        const baseUrl = "//localhost:8080/api/survey-responses";
        const res = await httpClient.get(`${baseUrl}?page=${active}&limit=${limit}&fromDate=${fromDate}&toDate=${toDate}`);
        setResponseData(res.data.responses);
      } catch (error) {
        console.log("data not found", error.message);
      }
    })();
  }, [active,fromDate, toDate]);

  const statusOption = {
    "active": "green",
    "free": "blue",
    "cancelled": "red",
    "pause": "yellow"
  };

  return (
    <div className="mt-12">
        <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Survey Responses Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="flex items-center p-5">
            <div className="mr-auto md:mr-4 md:w-56">
              <Input label="From" type="date" onChange={(e) => {setFromDate(e.target.value)}} />
            </div>
            <div className="mr-auto md:mr-4 md:w-56">
              <Input label="To" type="date" onChange={(e) => {setToDate(e.target.value)}} />
            </div>
            <div className="mr-auto md:mr-4 md:w-56">
              <Button onClick={handleClearFilter}>Clear Filter</Button>;
            </div>
          </div>
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Name", "Role", "Survey Response","Website", "view"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {responseData.map(
                ({_id, userId, role, whySaral, website, trialStartedAt }, key) => {
                  const className = `py-3 px-5 ${
                    key === responseData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={_id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {userId?.first_name + " " + userId?.last_name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {userId?.email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                        {role}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                            {whySaral}
                        </Typography>
                          </td>
                          <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                            <Link to={{ pathname: `${website}`}} target="_blank">{ website}</Link>
                        </Typography>
                      </td>
                          <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600 cursor-pointer" >
                             <EyeIcon className="h-5 w-5 text-blue-gray-500 " onClick={() => handleOpen(_id)} variant="gradient"  />
                        </Typography>   
                      </td>
                      </tr>
                  );
                }
              )}
            </tbody>
          </table>
              </CardBody>
               <CardFooter className=" flex justify-center">
          <div className="flex items-center gap-4">
            <Button
              variant="text"
              className="flex items-center gap-2"
              onClick={prev}
              disabled={active === 1}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
            </Button>
            <div className="flex items-center gap-2">
              <IconButton {...getItemProps(1)}>1</IconButton>
              <IconButton {...getItemProps(2)}>2</IconButton>
              <IconButton {...getItemProps(3)}>3</IconButton>
              <IconButton {...getItemProps(4)}>4</IconButton>
              <IconButton {...getItemProps(5)}>5</IconButton>
            </div>
            <Button
              variant="text"
              className="flex items-center gap-2"
              onClick={next}
              disabled={active === 5}
            >
              Next
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
          </div>
            </CardFooter>
          </Card>
           <Dialog open={open} handler={handleOpen} className="h-[42rem] overflow-y-scroll"  >
                <DialogHeader>Response Details</DialogHeader>
              <DialogBody >
                <div className="mb-1 flex flex-col gap-6">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Name
                    </Typography>
                    <Input
                        size="lg"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          value={rowData.userId?.first_name+ " " + rowData.userId?.last_name}
                        labelProps={{
                        className: "before:content-none after:content-none",
                        }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Your Email
                    </Typography>
                    <Input
                        size="lg"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          value={rowData.userId?.email}
                        labelProps={{
                        className: "before:content-none after:content-none",
                        }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Role
                    </Typography>
                    <Input
                        type="text"
                        size="lg"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          value={rowData.role}
                        labelProps={{
                        className: "before:content-none after:content-none",
                        }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Response
                    </Typography>
                    <Input
                        type="text"
                        size="lg"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          value={rowData.whySaral}
                        labelProps={{
                        className: "before:content-none after:content-none",
                        }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Website
                    </Typography>
                    <Input
                        type="text"
                        size="lg"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          value={rowData.website}
                        labelProps={{
                        className: "before:content-none after:content-none",
                        }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Channel Type
                    </Typography>
                    <Input
                        type="text"
                        size="lg"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          value={rowData.channelType}
                        labelProps={{
                        className: "before:content-none after:content-none",
                        }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        channelDetails
                    </Typography>
                    <Input
                        type="text"
                        size="lg"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          value={rowData.channelDetails}
                        labelProps={{
                        className: "before:content-none after:content-none",
                        }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        feedback
                    </Typography>
                    <Input
                        type="text"
                        size="lg"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          value={rowData.feedback}
                        labelProps={{
                        className: "before:content-none after:content-none",
                        }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        feedback
                    </Typography>
                    <Input
                        type="text"
                        size="lg"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          value={rowData.feedback}
                        labelProps={{
                        className: "before:content-none after:content-none",
                        }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        personalisedOnboarding
                    </Typography>
                    <Input
                        type="text"
                        size="lg"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          value={rowData.personalisedOnboarding}
                        labelProps={{
                        className: "before:content-none after:content-none",
                        }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        rating
                    </Typography>
                    <Input
                        type="text"
                        size="lg"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          value={rowData.rating}
                        labelProps={{
                        className: "before:content-none after:content-none",
                        }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        revenue
                    </Typography>
                    <Input
                        type="text"
                        size="lg"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          value={rowData.revenue}
                        labelProps={{
                        className: "before:content-none after:content-none",
                        }}
                    />
                    </div>
                </DialogBody>
                <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={handleClose}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                </DialogFooter>
            </Dialog>
      </div>
  );
}

export default SurveyResponse;
