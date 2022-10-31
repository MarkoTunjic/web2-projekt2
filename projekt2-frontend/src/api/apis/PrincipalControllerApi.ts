/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  PrincipalDTO,
} from '../models';
import {
    PrincipalDTOFromJSON,
    PrincipalDTOToJSON,
} from '../models';

/**
 * 
 */
export class PrincipalControllerApi extends runtime.BaseAPI {

    /**
     */
    async getAllPrincipalsInsecureRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<PrincipalDTO>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/admin/principals/insecure`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PrincipalDTOFromJSON));
    }

    /**
     */
    async getAllPrincipalsInsecure(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<PrincipalDTO>> {
        const response = await this.getAllPrincipalsInsecureRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async getAllPrincipalsSecureRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<PrincipalDTO>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerAuthentication", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/admin/principals/secure`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PrincipalDTOFromJSON));
    }

    /**
     */
    async getAllPrincipalsSecure(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<PrincipalDTO>> {
        const response = await this.getAllPrincipalsSecureRaw(initOverrides);
        return await response.value();
    }

}
