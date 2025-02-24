"use client";
import React from "react";
import { monthNames } from "@/utils/constant";
import BarChart from "../chart/BarChart";

interface IProps {
  data: { month: number; year: number; count: number }[];
}

function BlogsAnalysis({ data }: IProps) {
  const labels = data.map((item) => monthNames[item.month - 1] + "-" + item.year);

  const dataset = {
    label: "",
    data: data.map((item) => Math.random() * 100000),
    backgroundColor: [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
    ],
    borderColor: [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
    ],
  };

  return (
    <div className="">
      <BarChart labels={labels} dataset={dataset} />
    </div>
  );
}

export default BlogsAnalysis;
