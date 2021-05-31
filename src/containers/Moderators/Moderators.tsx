import React, {useCallback, useEffect} from 'react';
import { observer } from "mobx-react-lite";
import { withStyle } from 'baseui';
import { Grid, Row as Rows, Col as Column } from 'components/FlexBox';
import { useDrawerDispatch } from 'context/DrawerContext';
import MaterialTable from 'material-table';
import moderators from "stores/moderatorsStore";
import {tableLocalization} from "settings/tableLocalization";

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
const ModeratorsTable = observer(() => {
    const dispatch = useDrawerDispatch();
    const openDrawer = useCallback(
        () => dispatch({ type: 'OPEN_DRAWER', drawerComponent: 'MODERATOR_FORM' }),
        [dispatch]
    );
    const openEditDrawer = useCallback(
        () =>
            dispatch({
                type: 'OPEN_DRAWER',
                drawerComponent: 'MODERATOR_UPDATE_FORM',
            }),
        [dispatch]
    );
    useEffect(() => {
        moderators.getModerators()
    }, [])

    function openEdit(event, row){
        console.log(event)
        moderators.id = row.id;
        openEditDrawer();
    }

    return (
        <Grid fluid={true}>
            <Row>
                <Col md={12}>
                    <MaterialTable
                        title="Таблица редакторов"
                        columns={[
                            { title: 'ID', field: 'id', editable: 'never' },
                            { title: 'Логин', field: "login"},
                            { title: 'Дата добавление', field: "creationDate"},
                        ]}
                        data={moderators.getModeratorsTable}
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
                                onClick: () => moderators.getModerators(),
                            },
                            {
                                icon: 'add',
                                tooltip: 'Добавить редактора',
                                isFreeAction: true,
                                onClick: () => openDrawer()
                            }
                        ]}
                        editable={{
                            onRowDelete: (oldData) =>
                                new Promise((resolve, reject)  => {
                                    setTimeout(() => {
                                        moderators.deleteModerator(oldData.id, oldData.login)
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

export default ModeratorsTable;
