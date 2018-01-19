/// <reference types="express" />
import { Request, Response } from 'express';
export default function httpsRedirectMiddleware(): (request: Request, response: Response) => void;
