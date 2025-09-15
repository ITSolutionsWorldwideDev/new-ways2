// services/netsuiteAxios.ts

import axios from "axios";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import { AxiosHeaders } from "axios";

const {
    NS_ACCOUNT_ID,
    NS_CONSUMER_KEY,
    NS_CONSUMER_SECRET,
    NS_TOKEN_ID,
    NS_TOKEN_SECRET,
} = process.env;

export const getNetSuiteAxios = () => {
    const oauth = new OAuth({
        consumer: {
            key: NS_CONSUMER_KEY!,
            secret: NS_CONSUMER_SECRET!,
        },
        signature_method: "HMAC-SHA256",
        hash_function(base_string, key) {
            return crypto
                .createHmac("sha256", key)
                .update(base_string)
                .digest("base64");
        },
    });

    const baseURL = `https://${NS_ACCOUNT_ID?.toLowerCase().replace('_', '-')}.suitetalk.api.netsuite.com/services/rest`;


    const instance = axios.create({
        baseURL,
    });

    // Add OAuth 1.0a headers per request
    instance.interceptors.request.use((config) => {
        const request_data = {
            url: `${config.baseURL ?? ""}${config.url ?? ""}`,
            method: config.method?.toUpperCase() || "GET",
        };

        const headers = oauth.toHeader(
            oauth.authorize(request_data, {
                key: NS_TOKEN_ID!,
                secret: NS_TOKEN_SECRET!,
            })
        );

        // Add the `realm` manually to the Authorization header
        headers.Authorization += `, realm="${NS_ACCOUNT_ID?.toUpperCase().replace('-', '_')}"`;

        config.headers = AxiosHeaders.from({
            ...config.headers,
            ...headers,
            "Content-Type": "application/json",
        });

        return config;
    });

    return instance;
};
