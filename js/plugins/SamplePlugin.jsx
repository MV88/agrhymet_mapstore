/**
 * this is the custom plugin
 */
import Spinner from "react-spinkit";
import { changeZoomLevel } from '@mapstore/actions/map';
import sample from '@js/reducers/sample';
import sampleEpics from '@js/epics/sample';
import {
    getData
} from '@js/actions/sample';
import React, {useState} from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import ZoomComponent from "@js/components/Zoom";
const sampleSelector = createSelector(
    state => state && state.sample && state.sample.loading,
    state => state && state.sample && state.sample.result,
    (loading, result) => ({
        loading,
        result
    })
);


const SamplePlugin = ({
    onChangeZoom,
    onGetData,
    loading,
    result = []
}) => {
    const [counter, setCounter] = useState(0);

    return (<div id="sample-plugin">
        This is my sample plugin <br/>
        <ZoomComponent onChangeZoom={onChangeZoom} />
        <button onClick={() => {
            setCounter(counter + 1);
        }} >increment with local state</button> <br/>
        <p>this is the value of counter: {counter}</p>
        <button onClick={() => {
            onGetData();
        }} >getDataFromAsyncTask</button> <br/>
        { loading ? <Spinner/> : result.length}
    </div>);
};


export default {
    SamplePlugin: connect(sampleSelector, {
        onChangeZoom: changeZoomLevel,
        onGetData: getData
    })(SamplePlugin),
    reducers: {sample},
    epics: sampleEpics
};
