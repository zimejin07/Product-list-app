import {Injectable} from '@angular/core';
import {ApolloQueryResult, gql} from "@apollo/client/core";
import {Apollo} from "apollo-angular";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GraphqlService {
    token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MzcyODY1NDcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtNjI3cWh2bDAwdjIwN3djM3ltczEwZTMvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiJhYmU3OGEzZS05N2VmLTQ3YjctYTBiMi00OWJhYTc4YTBjNTkiLCJqdGkiOiJjbTYzamp6ZGYwbmR6MDdvNjV2aWY4cnB5In0.zwdOV9gO-h9KHXKNqxUBh335ObWB6sDG2NmuDwWnXwF52K9Kux8YUk9b2r-qMw7AUmLVCTKjNyS66JaQhZ1x-QZ0-2Jc6GL1775bEBdyjdGxc7Xy-9A_qV4xLUrrEeo_Q0aWBdE4c6Ytr7qsjEyIjZgD95khsyEfPQPPuvPRuGK7rfyS3-YxIg31ATIi9vTXnKPP7Zv4kHF_cxTw1XnKPRYl5PEIUdR9MDQ5E9v94lfqtawXzIKVVn1LYP0sTuxvhttVgpjLTFGVYEOR42PvjJhnRkRvR9CyJL2h9PIuLhdcyDQypDwXEUm_T36u5HJjQgn0zivDVauSTCyO6NAOrepU9YwjEs4WYCxRhYAIo7V0EsjR8FleW6EXQBPNlLg7z1a9O6jPGHcTcxvjr4xwNt3mGOZRQqaJRjejCJfmfT2GmxyvGvCspmU9sJXQ8PvhcS_z4_Vj9ae1JDV86ysZe3YwbxQT6f8vKBlEELjnKZnWFRlgE0LgLg-_TwCNHGhu8grvrIuM_10blAdJBAfKde_J-PelHgR0n8A3ebidaTlbmaFT-DQJFaLODN_KqmskJSosTZKQoGxDkVRCZCtNhEDdyc2av12sOMSLrOWybWy4ztBzwqVPvq3SzBhSx-7XKu0cX3kjginBH48ZEJs4yUzBV7vgLZbkR8oON4D8y80';

    constructor(private apollo: Apollo) {
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
