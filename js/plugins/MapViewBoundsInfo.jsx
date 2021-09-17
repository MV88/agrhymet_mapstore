
import React from 'react';
import { createPlugin } from '@mapstore/utils/PluginsUtils';
import { connect } from 'react-redux';
import Message from '@mapstore/components/I18N/Message';
import { Glyphicon } from 'react-bootstrap';
import { toggleControl } from '@mapstore/actions/controls';
import { mapSelector } from '@mapstore/selectors/map';

function MapViewBoundsInfo({
    enabled,
    map
}) {

    if (!enabled) {
        return null;
    }

    return (
        <div
            className="shadow"
            style={{
                position: 'absolute',
                left: '50%',
                bottom: 40,
                zIndex: 2000,
                backgroundColor: '#ffffff',
                transform: 'translateX(-50%)',
                padding: 8,
                textAlign: 'center'
            }}
        >
            <div><Message msgId="mapBounds"/> ({map?.bbox?.crs}):</div>
            {map?.bbox?.bounds && Object.keys(map.bbox.bounds).map((key) => {
                return (
                    <div key={key}>
                        {key}: <strong>{map.bbox.bounds[key].toFixed(1)}</strong>
                    </div>
                );
            })}
        </div>
    );
}

const ConnectedMapViewBoundsInfo = connect(
    (state) => ({
        enabled: state?.controls?.mapViewBounds?.enabled,
        map: mapSelector(state)
    })
)(MapViewBoundsInfo);

export default createPlugin('MapViewBoundsInfo', {
    component: ConnectedMapViewBoundsInfo,
    containers: {
        BurgerMenu: {
            name: 'mapViewBounds',
            position: 9,
            panel: false,
            tooltip: 'mapViewBounds',
            text: <Message msgId="mapViewBounds"/>,
            icon: <Glyphicon glyph="1-map"/>,
            action: () => toggleControl('mapViewBounds')
        }
    }
});
