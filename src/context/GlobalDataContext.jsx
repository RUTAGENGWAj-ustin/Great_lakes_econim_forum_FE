import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Notiflix from "notiflix";

// Create a context for all the API data
export const GlobalDataContext = createContext();

export const useGlobalDataContext = () => {
  return useContext(GlobalDataContext);
};

// Context Provider to wrap your app
export function GlobalDataProvider({ children }) {
  const fetchData = async (endpoint) => {
    const response = await axios.get(`http://localhost:5000/api/${endpoint}`);
    return response.data;
  };

  const createQuery = (key, endpoint) =>
    useQuery({
      queryKey: [key],
      queryFn: () => fetchData(endpoint),
      onError: (error) => {
        const errorMessage = error?.response?.data?.error || `Failed to fetch ${key}.`;
        Notiflix.Notify.failure(errorMessage);
      },
    });

  const { data: authData, isLoading: authLoading, error: authError } = createQuery("authData", "auth");
  console.log("auth:",authData);
  
  const { data: eventsData, isLoading: eventsLoading, error: eventsError } = createQuery("eventsData", "events");
  console.log("ddddd:",eventsData);
  
  const { data: speakersData, isLoading: speakersLoading, error: speakersError } = createQuery("speakersData", "speakers");
  const { data: topicsData, isLoading: topicsLoading, error: topicsError } = createQuery("topicsData", "topics");
  const { data: newsData, isLoading: newsLoading, error: newsError } = createQuery("newsData", "news");
  const { data: sponsorsData, isLoading: sponsorsLoading, error: sponsorsError } = createQuery("sponsorsData", "sponsors");
  const { data: paymentsData, isLoading: paymentsLoading, error: paymentsError } = createQuery("paymentsData", "payments");
  const { data: rsvpData, isLoading: rsvpLoading, error: rsvpError } = createQuery("rsvpData", "rsvp");
  const { data: categoryData, isLoading: categoryLoading, error: categoryError } = createQuery("categoryData", "category");
  const { data: galleryData, isLoading: galleryLoading, error: galleryError } = createQuery("galleryData", "gallery");

  const isLoading = [
    authLoading, eventsLoading, speakersLoading, topicsLoading, newsLoading,
    sponsorsLoading, paymentsLoading, rsvpLoading, categoryLoading, galleryLoading
  ].some(Boolean);

  const hasError = [
    authError, eventsError, speakersError, topicsError, newsError,
    sponsorsError, paymentsError, rsvpError, categoryError, galleryError
  ].some(Boolean);

  return (
    <GlobalDataContext.Provider
      value={{
        authData, eventsData, speakersData, topicsData, newsData,
        sponsorsData, paymentsData, rsvpData, categoryData, galleryData,
        isLoading, hasError,
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
}