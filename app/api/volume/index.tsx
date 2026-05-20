/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getServerSession } from "next-auth";

import { volume } from "@/constants/config";
import { CreateIssueProps, CreateVolumeProps } from "@/types";
import { request } from "@/utils/request";

import { authOptions } from "../auth/[...nextauth]/options";
import { fetchData } from "../call-methods";

export const getVolumes = async () => fetchData(volume.Volume);

export const getIssues = async () => fetchData(volume.Issue);

export const createVolume = async (payload: CreateVolumeProps) => {
  const session = await getServerSession(authOptions);

  const response = request("POST", `${volume.Volume}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });

  return response;
};

export const editVolume = async (id: string, name: any) => {
  const session = await getServerSession(authOptions);

  return request("PATCH", `${volume.Volume}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: { name },
  });
};

export const deleteVolume = async (id: string) => {
  const session = await getServerSession(authOptions);

  const response = await request("DELETE", `${volume.Volume}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  return response;
};

export const createIssue = async (payload: CreateIssueProps) => {
  const session = await getServerSession(authOptions);

  const response = request("POST", `${volume.Issue}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });

  return response;
};

export const editIssue = async (id: string, payload: any) => {
  const session = await getServerSession(authOptions);

  return request("PATCH", `${volume.Issue}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });
};

export const deleteIssue = async (id: string) => {
  const session = await getServerSession(authOptions);

  const response = await request("DELETE", `${volume.Issue}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  return response;
};
