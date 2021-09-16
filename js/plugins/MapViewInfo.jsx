import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { createPlugin } from '@mapstore/utils/PluginsUtils';
import { mapSelector } from '@mapstore/selectors/map';

import { Glyphicon } from 'react-bootstrap';
import Message from '@mapstore/components/I18N/Message';
import { toggleControl } from '@mapstore/actions/controls';

function MapViewInfo({
    center,
    enabled
}) {

    if (!enabled) {
        return null;
    }

    return (
        <div
            className="ms-map-view-info shadow"
            style={{
                position: 'absolute',
                zIndex: 100,
                bottom: 35,
                margin: 8,
                left: '50%',
                backgroundColor: '#ffffff',
                padding: 8,
                textAlign: 'center'
            }}
        >
            <div><small><Message msgId="mapCenter"/> ({center.crs})</small></div>
            <div>x: <strong>{center?.x?.toFixed(6)}</strong> - y: <strong>{center?.y?.toFixed(6)}</strong></div>
        </div>
    );
}

MapViewInfo.propTypes = {
    center: PropTypes.object
};

MapViewInfo.defaultProps = {
    center: {}
};

const MapViewInfoPlugin = connect(
    createSelector([
        mapSelector,
        state => state?.controls?.mapViewInfo?.enabled
    ], (map, enabled) => ({
        center: map?.center,
        enabled
    })),
    {}
)(MapViewInfo);

export default createPlugin('MapViewInfo', {
    component: MapViewInfoPlugin,
    containers: {
        BurgerMenu: {
            name: 'measurement',
            position: 9,
            panel: false,
            tooltip: 'mapViewInfo',
            text: <Message msgId="mapViewInfo"/>,
            icon: <Glyphicon glyph="1-map"/>,
            action: () => toggleControl('mapViewInfo')
        }
    },
    epics: {},
    reducers: {}
});
