import Rx from "rxjs";
import axios from "axios";

import {
    GET_DATA,
    getDataLoading,
    getDataLoaded
} from "@js/actions/sample";

export default {
    getDataEpic: (action$/* , store*/) => {
        return action$.ofType(GET_DATA)
            .switchMap(() => {
                // defer gets a function
                return Rx.Observable.defer(
                    () => axios.get("https://jsonplaceholder.typicode.com/posts")
                ).switchMap(response => {
                    return Rx.Observable.of(
                        getDataLoading(false),
                        getDataLoaded(response.data)
                    );
                })
                    .startWith(getDataLoading(true));
            });
    }
};
