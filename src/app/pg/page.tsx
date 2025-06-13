"use client";

import { Button } from "@/components/ui/button";
import { reset } from "@/store/slices/loan";
import { AppDispatch } from "@/store/store";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Loans = () => {
  const dispatch = useDispatch<AppDispatch>();
  //   dispatch(reset());

  useEffect(() => {
    console.log("main page USE EFFECT fired");

    dispatch(reset());
  }, [dispatch]);

  return (
    <>
      <b>Loan Types ::</b>
      <ul className="mt-10">
        <li>
          <Link href="/pg/abc">
            <Button variant="default" className="bg-amber-200 w-full mb-10">
              LAMF - posts
              <ChevronRight className="w-4 h-4 text-grey-600" />
            </Button>
          </Link>
        </li>
        <li>
          <Link href="pg/2">
            <Button variant="default" className="bg-green-200 w-full mb-10">
              LAS - comments
              <ChevronRight className="w-4 h-4 text-grey-600" />
            </Button>
          </Link>
        </li>
        <li>
          <Link href="pg/3">
            <Button variant="default" className="bg-violet-200 w-full mb-10">
              Home LOAN - todos
              <ChevronRight className="w-4 h-4 text-grey-600" />
            </Button>
          </Link>
        </li>
        <li>
          <Link href="pg/4">
            <Button variant="default" className="bg-cyan-200 w-full mb-10">
              Loan Against Property - photos
              <ChevronRight className="w-4 h-4 text-grey-600" />
            </Button>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Loans;
