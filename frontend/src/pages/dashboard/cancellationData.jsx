import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Input,
  CardFooter,
  Button,
  IconButton  
} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import httpClient from "@/configs/httpClient";
import { EyeIcon } from "@heroicons/react/24/solid";


export function CancellationData() {

  const [userData, setUserData] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [active, setActive] = useState(1);

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
        const baseUrl = "//localhost:8080/api/cancelled-data";
          const res = await httpClient.get(`${baseUrl}?page=${active}&limit=${limit}&email=${searchEmail}&status=${searchStatus}`);
          console.log(res.data)
        setUserData(res.data.users);
      } catch (error) {
        console.log("data not found", error.message);
      }
    })();
  }, [active, searchEmail, searchStatus]);

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
            Cancellation Data Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="flex items-center p-5">
            <div className="mr-auto md:mr-4 md:w-56">
              <Input  placeholder="search by email" onChange={(e) => {setSearchEmail(e.target.value)}}/>
            </div>
            <div className="mr-auto md:mr-4 md:w-56">
              <Input placeholder="search by status" onChange={(e) => { setSearchStatus(e.target.value) }} />
            </div>
            <div className="mr-auto md:mr-4 md:w-56">
              <Button onClick={handleClearFilter}>Clear Filter</Button>;
            </div>
          </div>
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Name", "status","Started At", "Churn Type", "Cancelled At", "Action"].map((el) => (
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
              {userData.map(
                ({ first_name, last_name, email, subscriptionStatus , trialStartedAt, cancelledAt}, key) => {
                  const className = `py-3 px-5 ${
                    key === userData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {first_name + " " + last_name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={subscriptionStatus ? statusOption[subscriptionStatus] : "blue"}
                          value={subscriptionStatus ? subscriptionStatus : "free"}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                          </td>
                          <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                        {trialStartedAt ? new Date(trialStartedAt).toLocaleDateString('en-GB') : ""}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          Paid
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                         {cancelledAt ? new Date(cancelledAt).toLocaleDateString('en-GB') : ""}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                           <EyeIcon className="h-5 w-5 text-blue-gray-500 " variant="gradient"  />
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
    </div>
  );
}

export default CancellationData;
