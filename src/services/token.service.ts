import {Injectable} from "@angular/core";
import {TOKEN} from "../utils/token";

@Injectable({
    providedIn: "root",
})
export class TokenService {
    token = TOKEN;

    constructor() {
    }
}
