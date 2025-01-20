import {Injectable} from '@angular/core';
import {ApolloQueryResult, gql} from "@apollo/client/core";
import {Apollo} from "apollo-angular";
import {BehaviorSubject, Observable} from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class GraphqlService {
    private token:string;

    viewType$: BehaviorSubject<string> = new BehaviorSubject("gridView");

    constructor(private apollo: Apollo, private authService: TokenService) {
      this.token = this.authService.token;
    }

    getProducts(category?: string) {
        const query = category ? gql`
      query GetProducts($category: String) {
        products(where: { category: { name: $category } }) {
          name
          state
          sales
          stock
          price
          image {
            url
          }
          category {
            name
          }
        }
      }
    ` : gql`
      query GetProducts {
        products {
          name
          state
          sales
          stock
          price
          image {
            url
          }
          category {
            name
          }
        }
      }
    `;

        const variables = category ? {category} : {};

        return this.apollo.watchQuery({
            query, variables, context: {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }
        }).valueChanges;
    }


    getCategories() {
        const CATEGORIES_QUERY = gql`
      query GetCategories {
        categories {
          name
        }
      }
    `;

        return this.apollo.watchQuery({
            query: CATEGORIES_QUERY, context: {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }
        }).valueChanges;
    }

    getProductDetails(productName: string):Observable<ApolloQueryResult<unknown>> {
        const PRODUCT_BY_NAME_QUERY = gql`
          query GetProductByName($name: String!) {
            products(where: { name: $name }) {
              name
              state
              sales
              description
              stock
              price
              image {
                url
              }
              category {
                name
              }
            }
          }
        `;
    
        const variables = { name: productName };
    
        return this.apollo.watchQuery({
            query: PRODUCT_BY_NAME_QUERY,
            variables,
            context: {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }
        }).valueChanges;
    }
    
}
