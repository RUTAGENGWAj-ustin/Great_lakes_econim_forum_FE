import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Notiflix from "notiflix";

// Create a context for all the API data
export const GlobalDataContext = createContext();

export const useGlobalDataContext = () => {
  return useContext(GlobalDataContext);
};

const API_BASE_URL = "http://localhost:5000/api";

// Function to fetch data
const fetchData = async (endpoint) => {
  const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
  return response.data;
};
const fetchProfile = async (endpoint) => {
  const response = await axios.get(`${API_BASE_URL}/${endpoint}`,{
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

  // Function to fetch a single event by ID
  const fetchSingleEvent = async (eventId) => {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error("Failed to fetch event");
    }
    return response.json();
  };

// Function to send a POST request
const createPost = (endpoint) => async (data) => {
  const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

// Function to send a PUT request
const createPut = (endpoint) => async (id, data, token) => {
  const response = await axios.put(`${API_BASE_URL}/${endpoint}/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

// Function to send a DELETE request
const createDelete = (endpoint) => async (id, token) => {
  await axios.delete(`${API_BASE_URL}/${endpoint}/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};

// Function to create a query
const createQuery = (key, endpoint) =>
  useQuery({
    queryKey: [key],
    queryFn: () => fetchData(endpoint),
    onError: (error) => {
      const errorMessage = error?.response?.data?.error || `Failed to fetch ${key}.`;
      Notiflix.Notify.failure(errorMessage);
    },
  });
  const createQueryProfile = (key, endpoint) =>
    useQuery({
      queryKey: [key],
      queryFn: () => fetchProfile(endpoint),
      onError: (error) => {
        const errorMessage = error?.response?.data?.error || `Failed to fetch ${key}.`;
        Notiflix.Notify.failure(errorMessage);
      },
    });

export function GlobalDataProvider({ children }) {
  const { data: authData, isLoading: authLoading, error: authError } = createQueryProfile("authData", "auth/users");
  const { data: authprofileData, isLoading: authprofileLoading, error: authprofileError } = createQueryProfile("authprofileData", "auth/profile");
  const { data: eventsData, isLoading: eventsLoading, error: eventsError } = createQuery("eventsData", "events");
  const { data: speakersData, isLoading: speakersLoading, error: speakersError } = createQuery("speakersData", "speakers");

  console.log("eventsData:", eventsData);
  
  const { data: topicsData, isLoading: topicsLoading, error: topicsError } = createQuery("topicsData", "topics");
  const { data: newsData, isLoading: newsLoading, error: newsError } = createQuery("newsData", "news");
  const { data: sponsorsData, isLoading: sponsorsLoading, error: sponsorsError } = createQuery("sponsorsData", "sponsors");
  const { data: paymentsData, isLoading: paymentsLoading, error: paymentsError } = createQuery("paymentsData", "payments");
  const { data: rsvpData, isLoading: rsvpLoading, error: rsvpError } = createQuery("rsvpData", "rsvp");
  const { data: categoryData, isLoading: categoryLoading, error: categoryError } = createQuery("categoryData", "category");
  const { data: galleryData, isLoading: galleryLoading, error: galleryError } = createQuery("galleryData", "gallery");
  const { data: advertData, isLoading: advertLoading, error: advertError } = createQuery("advertData", "adverts");

  const postAuth = createPost("auth");
  const postEvent = createPost("events");
  const postSpeaker = createPost("speakers");
  const postTopic = createPost("topics");
  const postNews = createPost("news");
  const postSponsor = createPost("sponsors");
  const postPayment = createPost("payments");
  const postRsvp = createPost("rsvp");
  const postCategory = createPost("category");
  const postGallery = createPost("gallery");
  const postAdvert = createPost("adverts");

  const putEvent = createPut("events");
  const putSpeaker = createPut("speakers");
  const putTopic = createPut("topics");
  const putNews = createPut("news");
  const putSponsor = createPut("sponsors");
  const putPayment = createPut("payments");
  const putRsvp = createPut("rsvp");
  const putCategory = createPut("category");
  const putGallery = createPut("gallery");
  const putAdvert = createPut("adverts")

  const deleteEvent = createDelete("events");
  const deleteSpeaker = createDelete("speakers");
  const deleteTopic = createDelete("topics");
  const deleteNews = createDelete("news");
  const deleteSponsor = createDelete("sponsors");
  const deletePayment = createDelete("payments");
  const deleteRsvp = createDelete("rsvp");
  const deleteCategory = createDelete("category");
  const deleteGallery = createDelete("gallery");
  const deleteAdvert = createDelete("adverts")

  const isLoading = [
    authLoading,authprofileLoading, eventsLoading, speakersLoading, topicsLoading, newsLoading,advertLoading,
    sponsorsLoading, paymentsLoading, rsvpLoading, categoryLoading, galleryLoading
  ].some(Boolean);

  const hasError = [
    authError,authprofileError, eventsError, speakersError, topicsError, newsError,advertError,
    sponsorsError, paymentsError, rsvpError, categoryError, galleryError
  ].some(Boolean);

  const getSingleEvent = (eventId) =>
    useQuery({
      queryKey: ["event", eventId],
      queryFn: () => fetchSingleEvent(eventId),
      onError: (error) => {
        const errorMessage = error?.response?.data?.error || `Failed to fetch event ${eventId}.`;
        Notiflix.Notify.failure(errorMessage);
      },
    });

  const backendUrl = "http://localhost:5000/"; 
  const backendUrl2 = "http://localhost:5000"; 
  console.log("authprofileData:",authprofileData);
  

  return (
    <GlobalDataContext.Provider
      value={{
        authData,authprofileData, eventsData, speakersData, topicsData, newsData,advertData,
        sponsorsData, paymentsData, rsvpData, categoryData, galleryData,
        isLoading, hasError,
        postAuth, postEvent, postSpeaker,postAdvert, postTopic, postNews, postSponsor, postPayment, postRsvp, postCategory, postGallery,
        putEvent, putSpeaker, putTopic,putAdvert, putNews, putSponsor, putPayment, putRsvp, putCategory, putGallery,
        deleteEvent, deleteSpeaker,deleteAdvert, deleteTopic, deleteNews, deleteSponsor, deletePayment, deleteRsvp, deleteCategory, deleteGallery,
        backendUrl,backendUrl2,getSingleEvent,
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
}
