import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Notiflix from "notiflix";

// Create a context for all the API data
export const GlobalDataContext = createContext();

export const useGlobalDataContext = () => {
  return useContext(GlobalDataContext);
};

// Context Provider to wrap your app
export default function GlobalDataProvider({ children }) {
  const { data: authData, isLoading: authLoading, error: authError } = useQuery(
    ["authData"],
    async () => {
      const response = await axios.get("/api/auth");
      return response.data;
    },
    {
      onError: (error) => {
        const errorMessage = error?.response?.data?.error || "Failed to fetch auth data.";
        Notiflix.Notify.failure(errorMessage);
      },
    }
  );

  const { data: eventsData, isLoading: eventsLoading, error: eventsError } = useQuery(
    ["eventsData"],
    async () => {
      const response = await axios.get("/api/events");
      console.log("sssssssss:",response?.data);
      return response?.data;
      
      
    },
    {
      onError: (error) => {
        const errorMessage = error?.response?.data?.error || "Failed to fetch events.";
        Notiflix.Notify.failure(errorMessage);
      },
    }
  );

  const { data: speakersData, isLoading: speakersLoading, error: speakersError } = useQuery(
    ["speakersData"],
    async () => {
      const response = await axios.get("/api/speakers");
      return response.data;
    },
    {
      onError: (error) => {
        const errorMessage = error?.response?.data?.error || "Failed to fetch speakers.";
        Notiflix.Notify.failure(errorMessage);
      },
    }
  );

  const { data: topicsData, isLoading: topicsLoading, error: topicsError } = useQuery(
    ["topicsData"],
    async () => {
      const response = await axios.get("/api/topics");
      return response.data;
    },
    {
      onError: (error) => {
        const errorMessage = error?.response?.data?.error || "Failed to fetch topics.";
        Notiflix.Notify.failure(errorMessage);
      },
    }
  );

  const { data: newsData, isLoading: newsLoading, error: newsError } = useQuery(
    ["newsData"],
    async () => {
      const response = await axios.get("/api/news");
      return response.data;
    },
    {
      onError: (error) => {
        const errorMessage = error?.response?.data?.error || "Failed to fetch news.";
        Notiflix.Notify.failure(errorMessage);
      },
    }
  );

  const { data: sponsorsData, isLoading: sponsorsLoading, error: sponsorsError } = useQuery(
    ["sponsorsData"],
    async () => {
      const response = await axios.get("/api/sponsors");
      return response.data;
    },
    {
      onError: (error) => {
        const errorMessage = error?.response?.data?.error || "Failed to fetch sponsors.";
        Notiflix.Notify.failure(errorMessage);
      },
    }
  );

  const { data: paymentsData, isLoading: paymentsLoading, error: paymentsError } = useQuery(
    ["paymentsData"],
    async () => {
      const response = await axios.get("/api/payments");
      return response.data;
    },
    {
      onError: (error) => {
        const errorMessage = error?.response?.data?.error || "Failed to fetch payments.";
        Notiflix.Notify.failure(errorMessage);
      },
    }
  );

  const { data: rsvpData, isLoading: rsvpLoading, error: rsvpError } = useQuery(
    ["rsvpData"],
    async () => {
      const response = await axios.get("/api/rsvp");
      return response.data;
    },
    {
      onError: (error) => {
        const errorMessage = error?.response?.data?.error || "Failed to fetch RSVPs.";
        Notiflix.Notify.failure(errorMessage);
      },
    }
  );

  const { data: categoryData, isLoading: categoryLoading, error: categoryError } = useQuery(
    ["categoryData"],
    async () => {
      const response = await axios.get("/api/category");
      return response.data;
    },
    {
      onError: (error) => {
        const errorMessage = error?.response?.data?.error || "Failed to fetch categories.";
        Notiflix.Notify.failure(errorMessage);
      },
    }
  );

  const { data: galleryData, isLoading: galleryLoading, error: galleryError } = useQuery(
    ["galleryData"],
    async () => {
      const response = await axios.get("/api/gallery");
      return response.data;
    },
    {
      onError: (error) => {
        const errorMessage = error?.response?.data?.error || "Failed to fetch gallery.";
        Notiflix.Notify.failure(errorMessage);
      },
    }
  );

  // Check if any of the data is still loading
  const isLoading =
    authLoading ||
    eventsLoading ||
    speakersLoading ||
    topicsLoading ||
    newsLoading ||
    sponsorsLoading ||
    paymentsLoading ||
    rsvpLoading ||
    categoryLoading ||
    galleryLoading;

  // If any error occurs
  const hasError =
    authError || eventsError || speakersError || topicsError || newsError || sponsorsError || paymentsError || rsvpError || categoryError || galleryError;

  return (
    <GlobalDataContext.Provider
      value={{
        authData,
        eventsData,
        speakersData,
        topicsData,
        newsData,
        sponsorsData,
        paymentsData,
        rsvpData,
        categoryData,
        galleryData,
        isLoading,
        hasError,
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
}
