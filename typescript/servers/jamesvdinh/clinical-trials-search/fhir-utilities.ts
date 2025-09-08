import { Request } from "express";
import { FhirContext } from "./fhir-context";
import {
  FhirAccessTokenHeaderName,
  FhirServerUrlHeaderName,
  PatientIdHeaderName,
} from "./mcp-constants";
import * as jose from "jose";
import axios from "axios";
import { Bundle } from "./src/utils/bundle";

export function getFhirContext(req: Request): FhirContext | null {
  const headers = req.headers;
  const url = headers[FhirServerUrlHeaderName]?.toString();

  if (!url) {
    return null;
  }

  const token = headers[FhirAccessTokenHeaderName]?.toString();
  if (!token) {
    return null;
  }

  return { url, token };
}

export function getPatientIdIfContextExists(req: Request) {
  const fhirToken = req.headers[FhirAccessTokenHeaderName]?.toString();
  if (fhirToken) {
    const claims = jose.decodeJwt(fhirToken);
    if (claims["patient"]) {
      return claims["patient"]?.toString();
    }
  }

  return req.headers[PatientIdHeaderName]?.toString() || null;
}

export async function getFhirResource(
  fhirContext: FhirContext,
  resourceType: string,
  patientId: string
): Promise<Bundle> {
  const response = await axios.get<Bundle>(
    `${fhirContext.url}/${resourceType}?patient=${patientId}`,
    {
      headers: {
        Authorization: `Bearer ${fhirContext.token}`,
      },
    }
  );

  return response.data;
}