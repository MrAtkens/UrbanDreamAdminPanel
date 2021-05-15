import React, {useCallback, useEffect} from 'react';
import { observer } from "mobx-react-lite";
import { withStyle } from 'baseui';
import { Grid, Row as Rows, Col as Column } from 'components/FlexBox';
import { useDrawerDispatch } from 'context/DrawerContext';
import MaterialTable from 'material-table';
import Image from 'material-ui-image';


import categories from "stores/categoriesStore";
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
        categories.getCategories()
    }, [])

    if (categories.error) {
        return <div>Error! {categories.error}</div>;
    }

    function openEdit(event, row){
        console.log(event)
        categories.id = row.id;
        openEditDrawer();
    }
    return (
        <Grid fluid={true}>
            <Row>
                <Col md={12}>
                    <MaterialTable
                        title="Таблица категорий"
                        columns={[
                            { title: 'ID', field: 'id', editable: 'never' },
                            { title: 'Иконка', field: 'urlImg', render: rowData => <Image src={rowData.urlImg}  aspectRatio={(16/9)}/> },
                            { title: 'Название', field: "name"},
                            { title: 'Описание', field: "description"},
                            { title: 'Дата добавление', field: "creationDate"},
                        ]}
                        data={categories.getCategoriesTable}
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
                                onClick: () => categories.getCategories(),
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
                                        console.log(oldData)
                                        categories.deleteCategory(oldData.id)
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

export default CategoriesTable;