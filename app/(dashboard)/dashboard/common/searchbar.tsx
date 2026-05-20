"use client";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  CircularProgress,
  ClickAwayListener,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { globalSearch } from "@/app/api/(landing-page)/manuscript";
import { Manuscript } from "@/types";

const useStyles = makeStyles({
  searchContainer: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  searchIcon: {
    cursor: "pointer",
  },
  searchInput: {
    width: 0,
    overflow: "hidden",
    transition: "width 0.3s ease-in-out",
  },
  expanded: {
    width: "300px",
  },
  "@media (max-width: 600px)": {
    expanded: {
      width: "200px",
    },
  },
});

const ExpandingSearchBar = () => {
  const classes = useStyles();
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<Manuscript[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearchClick = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const performSearch = useCallback(async (query: string) => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setLoading(true);
    try {
      const response = await globalSearch(query);
      if (response?.data && Array.isArray(response.data)) {
        setResults(response.data);
        setShowResults(true);
      } else {
        setResults([]);
        setShowResults(true);
      }
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue.trim()) {
        performSearch(inputValue);
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [inputValue, performSearch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      performSearch(inputValue);
    }
    if (e.key === "Escape") {
      setShowResults(false);
      setExpanded(false);
    }
  };

  const handleResultClick = (manuscriptId: string) => {
    setShowResults(false);
    setInputValue("");
    setExpanded(false);
    router.push(`/manuscripts/details/${manuscriptId}`);
  };

  const handleClear = () => {
    setInputValue("");
    setResults([]);
    setShowResults(false);
  };

  const handleClickAway = () => {
    setShowResults(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.searchContainer}>
        <IconButton className={classes.searchIcon} onClick={handleSearchClick}>
          <SearchIcon />
        </IconButton>
        <InputBase
          placeholder="Search manuscripts..."
          className={`${classes.searchInput} ${expanded ? classes.expanded : ""}`}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          value={inputValue}
          endAdornment={
            <>
              {loading && <CircularProgress size={18} sx={{ mr: 1 }} />}
              {inputValue && (
                <IconButton size="small" onClick={handleClear}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </>
          }
        />

        {/* Search Results Dropdown */}
        {showResults && expanded && (
          <Paper
            elevation={8}
            sx={{
              position: "absolute",
              top: "100%",
              right: 0,
              width: 400,
              maxHeight: 400,
              overflowY: "auto",
              zIndex: 9999,
              mt: 0.5,
              borderRadius: 2,
            }}
          >
            {results.length > 0 ? (
              <List dense>
                {results.map((manuscript) => (
                  <ListItem key={manuscript.id} disablePadding>
                    <ListItemButton
                      onClick={() => handleResultClick(manuscript.id)}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            noWrap
                          >
                            {manuscript.title}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            {manuscript.Authors?.join(", ")}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  No manuscripts found for &quot;{inputValue}&quot;
                </Typography>
              </Box>
            )}
          </Paper>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default ExpandingSearchBar;
