"use client";

import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Masonry from "@mui/lab/Masonry";

const ServiceList = ({ documentInformation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    setFilteredCountries(Object.keys(documentInformation));
  }, [documentInformation]);

  // Get an array of countries
  const countries = Object.keys(documentInformation);
  // const countries = ["Canada"];
  // Calculate the number of items per column
  const itemsPerColumn = Math.ceil(filteredCountries.length / 3);

  return (
    <section className="flex flex-col gap-8 items-center md:w-[1200px] px-4 md:px-0">
      <div className="md:w-96 w-full">
        <TextField
          id="country-input"
          placeholder="Canada"
          label="Enter country name"
          variant="outlined"
          sx={{
            width: "100%",
          }}
          onChange={(e) => {
            setSearchTerm(e.target.value);

            if (e.target.value.toLowerCase().trim() === "") {
              setFilteredCountries(countries);
            } else {
              setFilteredCountries(
                countries.filter((country) =>
                  country
                    .toLowerCase()
                    .trim()
                    .includes(e.target.value.toLowerCase().trim())
                )
              );
            }
          }}
          value={searchTerm}
        />
      </div>
      <div className="md:w-[1200px] px-4 md:px-0 flex flex-col md:flex-row justify-between">
        {/* {[...Array(3)].map((_, columnIndex) => (
          <div
            key={columnIndex}
            className="flex flex-col items-start text-left gap-8 md:w-1/3 md:px-2"
          >
            {filteredCountries
              .slice(
                columnIndex * itemsPerColumn,
                (columnIndex + 1) * itemsPerColumn +
                  (columnIndex === 0 ? 3 : columnIndex === 1 ? 5 : 0)
              )
              .map((country) => (
                <div key={country}>
                  <p className="text-2xl font-bold mb-2">{country}</p>
                  <ul className="list-disc pl-4">
                    {Object.entries(documentInformation[country]).map(
                      ([document, value]) => (
                        <li key={document} className="text-lg text-[#797979]">
                          {document}: {value}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ))}
          </div>
        ))} */}
        <div className="hidden md:block">
          <Masonry columns={3} spacing={3} sequential>
            {filteredCountries.map((country) => (
              <div key={country} className="text-left">
                <p className="text-2xl font-bold mb-2">{country}</p>
                <ul className="list-disc pl-4">
                  {Object.entries(documentInformation[country]).map(
                    ([document, value]) => (
                      <li key={document} className="text-lg text-[#797979]">
                        {document}: {value}
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </Masonry>
        </div>
        <div className="block md:hidden">
          <Masonry columns={1} spacing={3} sequential>
            {filteredCountries.map((country) => (
              <div key={country} className="text-left">
                <p className="text-2xl font-bold mb-2">{country}</p>
                <ul className="list-disc pl-4">
                  {Object.entries(documentInformation[country]).map(
                    ([document, value]) => (
                      <li key={document} className="text-lg text-[#797979]">
                        {document}: {value}
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </Masonry>
        </div>
      </div>
    </section>
  );
};

export default ServiceList;
