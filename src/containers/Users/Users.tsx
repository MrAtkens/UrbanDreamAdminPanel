import React, {useCallback, useEffect} from 'react';
import { observer } from "mobx-react-lite";
import { withStyle } from 'baseui';
import { Grid, Row as Rows, Col as Column } from 'components/FlexBox';
import { useDrawerDispatch } from 'context/DrawerContext';
import MaterialTable from 'material-table';
import users from "stores/usersStore";
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
const CustomersTable = observer(() => {
    const dispatch = useDrawerDispatch();
    const openEditDrawer = useCallback(
        () =>
            dispatch({
                type: 'OPEN_DRAWER',
                drawerComponent: 'CUSTOMER_UPDATE_FORM',
            }),
        [dispatch]
    );

    useEffect(() => {
        users.getUsers();
    },[])

    if (users.error) {
        return <div>Error! {users.error}</div>;
    }

    function openEdit(event, row){
        console.log(row)
        users.id = row.id;
        openEditDrawer();
    }

    return (
        <Grid fluid={true}>
            <Row>
                <Col md={12}>
                    <MaterialTable
                        title="Таблица Пользователей"
                        columns={[
                            { title: 'ID', field: 'id', editable: 'never' },
                            { title: 'Имя', field: "firstName"},
                            { title: 'Фамилия', field: "lastName" },
                            { title: 'Почта', field: "email" },
                            { title: 'Дата добавление', field: "creationDate"},
                        ]}
                        data={users.getUsersTable}
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
                                onClick: () => users.getUsers(),
                            }
                        ]}
                        editable={{
                            onRowDelete: (oldData) =>
                                new Promise((resolve, reject)  => {
                                    setTimeout(() => {
                                        users.deleteUser(oldData.id, oldData.login)
                                        // @ts-ignore
                                        resolve();
                                    }, 1000)
                                })
                        }}
                    />
                </Col>
            </Row>
        </Grid>
    );
})

export default CustomersTable;
