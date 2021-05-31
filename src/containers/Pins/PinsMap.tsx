import React, {useCallback, useEffect} from 'react';
import { observer } from "mobx-react-lite";
import { withStyle } from 'baseui';
import { Grid, MapRow, MapCol } from 'components/FlexBox';
import { useDrawerDispatch } from 'context/DrawerContext';
import {
    Clusterer,
    FullscreenControl,
    Map,
    Placemark,
    RulerControl,
    SearchControl, TypeSelector,
    YMaps, ZoomControl
} from "react-yandex-maps";


import pins from "stores/pinStore";

const Col = withStyle(MapCol, () => ({
    width: "100%",
    height: "100%",
    padding: 0
}));

const Row = withStyle(MapRow, () => ({
    width: "100%",
    height: "100%",
    padding: 0
}));

// @ts-ignore
const CategoriesTable = observer(() => {
    const dispatch = useDrawerDispatch();
    const openAcceptUserDrawer = useCallback(
        () =>
            dispatch({
                type: 'OPEN_DRAWER',
                drawerComponent: 'PIN_ACCEPT_FORM',
            }),
        [dispatch]
    );

    const openAcceptBrigadeDrawer = useCallback(
        () =>
            dispatch({
                type: 'OPEN_DRAWER',
                drawerComponent: 'PIN_BRIGADE_ACCEPT_FORM',
            }),
        [dispatch]
    );

    useEffect(() => {
        pins.getAllPins()
    }, [])

    const openAcceptUser = (row) => {
        console.log(row)
        pins.getById(row.id).then(() => {
            openAcceptUserDrawer();
        })
    }

    const openAcceptBrigade = (row) => {
        console.log(row)
        pins.getById(row.id).then(() => {
            openAcceptBrigadeDrawer();
        })
    }

    return (
        <Grid fluid={true} style={{width: "100%", height: "100%", padding: 0}}>
            <Row>
                <Col md={12}>
                    <YMaps style={{width: "100%", height: "100%"}}>
                        <Map
                            width="100%" height="100%"
                            defaultState={{
                                center: [51.17165477669397, 71.42999123084935],
                                zoom: 17,
                                controls: [],
                            }}
                        >
                            <FullscreenControl />
                            <TypeSelector options={{ float: 'right' }} />
                            <RulerControl options={{ float: 'right' }} />
                            <SearchControl options={{ float: 'right' }} />
                            <ZoomControl options={{ float: 'right' }} />

                            <Clusterer
                                options={{
                                    preset: 'islands#invertedRedClusterIcons',
                                    groupByCoordinates: false,
                                }}
                            >
                                {pins.getModeratingPinsTable.map(pin => (
                                    <Placemark properties={{iconCaption: pin.title}} options={{iconColor: "red"}} defaultGeometry={[pin.latitude, pin.longitude]} onClick={() => openAcceptUser(pin)} />
                                ))}
                            </Clusterer>
                            <Clusterer
                                options={{
                                    preset: 'islands#invertedBlueClusterIcons',
                                    groupByCoordinates: false,
                                }}
                            >
                                {pins.acceptedPins.map(pin => (
                                    <Placemark properties={{iconCaption: pin.title}} options={{iconColor: "blue"}} defaultGeometry={[pin.latitude, pin.longitude]} onClick={() => openAcceptBrigade(pin)} />
                                ))}
                            </Clusterer>
                            <Clusterer
                                options={{
                                    preset: 'islands#invertedVioletClusterIcons',
                                    groupByCoordinates: false,
                                }}
                            >
                                {pins.solvingPins.map(pin => (
                                    <Placemark properties={{iconCaption: pin.title}} options={{iconColor: "violet"}} defaultGeometry={[pin.latitude, pin.longitude]} onClick={() => openAcceptBrigade(pin)}/>
                                ))}
                            </Clusterer>
                            <Clusterer
                                options={{
                                    preset: 'islands#invertedGreenClusterIcons',
                                    groupByCoordinates: false,
                                }}
                            >
                                {pins.solvedPins.map(pin => (
                                    <Placemark properties={{iconCaption: pin.title}} options={{iconColor: "green"}} defaultGeometry={[pin.latitude, pin.longitude]}/>
                                ))}
                            </Clusterer>
                        </Map>
                    </YMaps>
                </Col>
            </Row>
        </Grid>
    );
})

export default CategoriesTable;
