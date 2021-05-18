import React, {useCallback, useEffect} from 'react';
import { observer } from "mobx-react-lite";
import { withStyle } from 'baseui';
import { Grid, Row as Rows, Col as Column } from 'components/FlexBox';
import { useDrawerDispatch } from 'context/DrawerContext';
import MaterialTable from 'material-table';
import brigade from "stores/brigadesStore";
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
const BrigadesTable = observer(() => {
    const dispatch = useDrawerDispatch();
    const openDrawer = useCallback(
        () =>
            dispatch({
                type: 'OPEN_DRAWER',
                drawerComponent: 'BRIGADE_ADD_FORM',
            }),
        [dispatch]
    );
    const openEditDrawer = useCallback(
        () =>
            dispatch({
                type: 'OPEN_DRAWER',
                drawerComponent: 'BRIGADE_UPDATE_FORM',
            }),
        [dispatch]
    );
    useEffect(() => {
        brigade.getBrigades().then(() => {
            console.log(brigade.getBrigadesTable)
        })
    }, [])

    if (brigade.error) {
        return <div>Error! {brigade.error}</div>;
    }

    function openEdit(event, row){
        console.log(event)
        brigade.id = row.id;
        openEditDrawer();
    }

    return (
        <Grid fluid={true}>
            <Row>
                <Col md={12}>
                    <MaterialTable
                        title="Таблица бригад"
                        columns={[
                            { title: 'ID', field: 'id', editable: 'never' },
                            { title: 'Имя', field: "firstName"},
                            { title: 'Фамилия', field: "lastName" },
                            { title: 'Номер', field: "phoneNumber" },
                            { title: 'Почта', field: "email" },
                            { title: 'Дата добавление', field: "creationDate"},
                        ]}
                        data={brigade.getBrigadesTable}
                        localization={tableLocalization}
                        options={{
                            actionsColumnIndex: -1,
                            exportButton: true,
                            grouping: true,
                            pageSize: 10
                        }}
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Изменить',
                                onClick: (event, rowData) => openEdit(event, rowData)
                            },
                            {
                                icon: 'refresh',
                                tooltip: 'Подгрузить данные',
                                isFreeAction: true,
                                onClick: () => brigade.getBrigades(),
                            },
                            {
                                icon: 'add',
                                tooltip: 'Добавить бригады',
                                isFreeAction: true,
                                onClick: () => openDrawer()
                            }
                        ]}
                        editable={{
                            onRowDelete: (oldData) =>
                                new Promise((resolve, reject)  => {
                                    console.log(oldData)
                                    brigade.deleteBrigade(oldData.id)
                                })
                        }}
                    />
                </Col>
            </Row>
        </Grid>
    );
})

export default BrigadesTable;
