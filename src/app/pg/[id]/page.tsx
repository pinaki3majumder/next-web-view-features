"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Comments, Photos, Post, Todos } from "@/models/dummy-loans.types";
import { add, reset } from "@/store/slices/loan";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const storeData = useSelector((state: RootState) => state.loan.value);

  const pathname = usePathname();
  const array = pathname.split("/");
  const lastsegment = array[array.length - 1];

  const [data, setData] = useState<Post[] | Comments[] | Todos[] | Photos[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [isApiCalled, setIsApiCalled] = useState("");

  useEffect(() => {
    console.log("storeData--", storeData);
    if ((storeData as Post[])?.length > 0) {
      console.log("Data already exists, skipping API call");
      setData(storeData as Post[]);
      setLoading(false);
      setIsApiCalled("false");
      return; // Exit early if data is already in Redux store
    }

    const segmentMap: { [key: string]: string } = {
      1: "posts",
      2: "comments",
      3: "todos",
      4: "photos",
    };
    const apiType = segmentMap[Number(lastsegment)] || "unknown";

    fetch(`https://jsonplaceholder.typicode.com/` + apiType)
      .then((response) => response.json())
      .then((json) => {
        console.log(lastsegment + " api fired--------------------", json);

        dispatch(add(json));
        setIsApiCalled("true");
        setData(json);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          dispatch(reset());
          history.back();
        }}
      >
        BACK
      </button>
      <br />
      page from <b>{lastsegment}</b>
      <br />
      isApiCalled: {isApiCalled}
      <br />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {data.map((item: Post | Comments | Todos | Photos) => {
            if (lastsegment === "1" && "title" in item && "body" in item) {
              return (
                <Link key={item?.id} href={`/pg/${lastsegment}/details`}>
                  <Card key={item?.id} className="mb-4 bg-amber-200">
                    <CardHeader>
                      <CardTitle>{item?.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{item?.body}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            }

            if (lastsegment === "2" && "name" in item) {
              return (
                <Link key={item?.id} href={`/pg/${lastsegment}/details`}>
                  <Card key={item?.id} className="mb-4 bg-green-200">
                    <CardHeader>
                      <CardTitle>{item?.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{item?.body}</p>
                    </CardContent>
                    <CardFooter>
                      <p>{item?.email}</p>
                    </CardFooter>
                  </Card>
                </Link>
              );
            }

            if (lastsegment === "3" && "title" in item && "completed" in item) {
              return (
                <Card
                  key={item?.id}
                  className={`mb-4 ${
                    item.completed ? "bg-violet-200" : "bg-red-200"
                  }`}
                >
                  <CardHeader>
                    <CardTitle>{item?.title}</CardTitle>
                  </CardHeader>
                </Card>
              );
            }

            if (
              lastsegment === "4" &&
              "title" in item &&
              "url" in item &&
              "thumbnailUrl" in item
            ) {
              return (
                <Card key={item?.id} className="mb-4 bg-cyan-200">
                  <CardHeader>
                    <CardTitle>{item?.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>URL : {item?.url as string}</p>
                    <p>Thumbnail URL : {item?.thumbnailUrl as string}</p>
                  </CardContent>
                </Card>
              );
            }
          })}
        </>
      )}
    </div>
  );
};

export default DetailsPage;
