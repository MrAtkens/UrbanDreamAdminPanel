import React, {useCallback, useEffect} from 'react';
import { observer } from "mobx-react-lite";
import { withStyle } from 'baseui';
import { Grid, Row as Rows, Col as Column } from 'components/FlexBox';
import { useDrawerDispatch } from 'context/DrawerContext';
import MaterialTable from 'material-table';
import vendors from "stores/vendorsStore";
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
const VendorsTable = observer(() => {
    const dispatch = useDrawerDispatch();
    const openEditDrawer = useCallback(
        () =>
            dispatch({
                type: 'OPEN_DRAWER',
                drawerComponent: 'VENDOR_UPDATE_FORM',
            }),
        [dispatch]
    );
    useEffect(() => {
        vendors.getVendors().then(() => {
            console.log(vendors.getVendorsTable)
        })
    }, [])

    if (vendors.error) {
        return <div>Error! {vendors.error}</div>;
    }

    function openEdit(event, row){
        console.log(event)
        vendors.id = row.id;
        openEditDrawer();
    }

    return (
        <Grid fluid={true}>
            <Row>
                <Col md={12}>
                    <MaterialTable
                        title="Таблица продавцов"
                        columns={[
                            { title: 'ID', field: 'id', editable: 'never' },
                            { title: 'Имя', field: "firstName"},
                            { title: 'Фамилия', field: "lastName" },
                            { title: 'Номер', field: "phoneNumber" },
                            { title: 'Почта', field: "email" },
                            { title: 'Дата добавление', field: "creationDate"},
                        ]}
                        data={vendors.getVendorsTable}
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
                                onClick: () => vendors.getVendors(),
                            }
                        ]}
                        editable={{
                            onRowDelete: (oldData) =>
                                new Promise((resolve, reject)  => {
                                    console.log(oldData)
                                    vendors.deleteVendor(oldData.id)
                                })
                        }}
                    />
                </Col>
            </Row>
        </Grid>
    );
})

export default VendorsTable;