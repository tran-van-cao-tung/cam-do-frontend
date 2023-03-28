import { useState } from "react";
import React from "react";
import { useNavigation } from "react-router-dom";
import "./CustomerManager.css";

import { Paper, IconButton, Input } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  return (
    <Paper
      component="form"
      onSubmit={() => {}}
      sx={{
        borderRadius: 20,
        border: "1px solid black",
        pl: 2,
        boxShadow: "none",
        mr: { sm: 3 },
        height: "56px",
        width: "18%",
        margin: "20px 0px 80px 60px",
      }}
    >
      <Input
        className="searchBar"
        placeholder="Tìm Kiếm ..."
        onChange={() => {}}
      />
      <IconButton
        type="submit"
        sx={{
          p: "15px",
          color: "red",
        }}
      >
        <Search />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
