import React, {useCallback, useEffect} from 'react';
import { observer } from "mobx-react-lite";
import { withStyle } from 'baseui';
import { Grid, Row as Rows, Col as Column } from 'components/FlexBox';
import { useDrawerDispatch } from 'context/DrawerContext';
import {Map, Placemark, YMaps} from "react-yandex-maps";


import pins from "stores/pinStore";
import {tableLocalization} from "../../settings/tableLocalization";

const Col = withStyle(Column, () => ({
    '@media only screen and (max-width: 767px)': {
        marginBottom: '20px',

        ':last-child': {
            marginBottom: 0,
        },
    },
}));

const Row = withStyle(Rows, () => ({
    '@media only screen and (min-width: 768px)': {
        alignItems: 'center',
    },
}));

// @ts-ignore
const CategoriesTable = observer(() => {
    const dispatch = useDrawerDispatch();
    const openDrawer = useCallback(
        () => dispatch({ type: 'OPEN_DRAWER', drawerComponent: 'CATEGORY_FORM' }),
        [dispatch]
    );
    const openEditDrawer = useCallback(
        () =>
            dispatch({
                type: 'OPEN_DRAWER',
                drawerComponent: 'CATEGORY_FORM_UPDATE',
            }),
        [dispatch]
    );

    useEffect(() => {
        pins.getPins()
    }, [])

    if (pins.error) {
        return <div>Error! {pins.error}</div>;
    }

    function openEdit(event, row){
        console.log(event)
        pins.id = row.id;
        openEditDrawer();
    }
    return (
        <Grid fluid={true}>
            <Row>
                <Col md={12}>
                    <YMaps>
                        <Map
                            width="100%"
                            height="100%"
                            defaultState={{
                                center: [51.17165477669397, 71.42999123084935],
                                zoom: 17,
                                controls: ['zoomControl', 'fullscreenControl'],
                            }}
                            modules={['control.ZoomControl', 'control.FullscreenControl']}
                        >
                            {pins.getPinsTable.map(pin => (
                                <Placemark properties={{iconCaption: "Офис HoloAds"}} defaultGeometry={[pin.latitude, pin.longitude]} />
                            ))}
                        </Map>
                    </YMaps>
                </Col>
            </Row>
        </Grid>
    );
})

export default CategoriesTable;
