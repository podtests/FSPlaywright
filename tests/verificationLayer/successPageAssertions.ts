import { expect } from "@playwright/test";
import LoginInputDao from "../dao/inputDao/loginInputDao";
import SuccessOutputDao from "../dao/outputDao/successOutputDao";

export function validateSuccessPage(actualData: LoginInputDao , expectedData: SuccessOutputDao) {
    expect(actualData.getUserName()).toEqual(expectedData.getEmail());   
}
