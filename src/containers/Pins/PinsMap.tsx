import React, {useCallback, useEffect} from 'react';
import { observer } from "mobx-react-lite";
import { withStyle } from 'baseui';
import { Grid, MapRow, MapCol } from 'components/FlexBox';
import { useDrawerDispatch } from 'context/DrawerContext';
import {Clusterer, Map, Placemark, YMaps} from "react-yandex-maps";


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

    const openEdit = (row) => {
        console.log(row)
        pins.id = row.id;
        openEditDrawer();
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
                                controls: ['zoomControl', 'fullscreenControl'],
                            }}
                            modules={['control.ZoomControl', 'control.FullscreenControl']}
                        >
                            <Clusterer
                                options={{
                                    preset: 'islands#invertedRedClusterIcons',
                                    groupByCoordinates: false,
                                }}
                            >
                                {pins.getPinsTable.map(pin => (
                                    <Placemark properties={{iconCaption: pin.title}} options={{iconColor: "red"}} defaultGeometry={[pin.latitude, pin.longitude]} onClick={() => openEdit(pin)} />
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
