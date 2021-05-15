import React, {useCallback, useEffect, useState} from 'react';
import { observer } from "mobx-react-lite";
import { useForm } from 'react-hook-form';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDrawerDispatch } from 'context/DrawerContext';
import Button, { KIND } from 'components/Button';
import { Row, Col, DrawerBox, Input, FormFields, FormLabel } from 'components';
import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from 'containers/DrawerItems/DrawerItems.style';

import categories from 'stores/categoriesStore'
import {Error} from "../../components/FormFields";
import {Textarea} from "../../components/Textarea";
import Uploader from "../../components/Uploader";

type Props = any;

const CategoriesUpdateForm: React.FC<Props> = observer(() => {
  const dispatch = useDrawerDispatch();
  const [description, setDescription] = useState(categories.getCategoryById.description);
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);
  const { register, errors, handleSubmit, setValue } = useForm({
    mode: 'onChange',
    defaultValues: categories.getCategoryById
  });
  useEffect(() => {
    register({ name: 'urlImg' }, { required: true });
    register({ name: 'description' },{ required: true });
  }, [register]);


  const onSubmit = (data) => {
    console.log(data)
    categories.editCategory(data.name, data.description, data.urlImg).then(() => {
      closeDrawer();
    })
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey)
      handleSubmit(onSubmit)();
  }

  const handleUploader = (files) => {
    setValue('urlImg', files[0]);
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setValue('description', value);
    setDescription(value);
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Изменить Категорию</DrawerTitle>
      </DrawerTitleWrapper>

      <Form onSubmit={handleSubmit(onSubmit)} style={{ height: '100%' }}>
        <Scrollbars
            autoHide
            renderView={(props) => (
                <div {...props} style={{ ...props.style, overflowX: 'hidden' }} />
            )}
            renderTrackHorizontal={(props) => (
                <div
                    {...props}
                    style={{ display: 'none' }}
                    className="track-horizontal"
                />
            )}
        >
          <Row>
            <Col lg={4}>
              <FieldDetails>Загрузите иконку категорий</FieldDetails>
            </Col>
            <Col lg={8}>
              <DrawerBox
                  overrides={{
                    Block: {
                      style: {
                        width: '100%',
                        height: 'auto',
                        padding: '30px',
                        borderRadius: '3px',
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    },
                  }}
              >
                <Uploader onChange={handleUploader} imageURL={categories.getCategoryById.urlImg} />
                {errors.urlImg && <Error>Не загружена иконка категорий*</Error>}
              </DrawerBox>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <FieldDetails>
                Введите название категорий, описание и индекс сортировки.<br/>
                Название будет показываться пользователям в выборе категорий.<br/>
                Описание будет показываться при навидений на категорий для подробного разъяснение.<br/>
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Название</FormLabel>
                  <Input
                      onKeyDown={handleKeyDown}
                      inputRef={register({ required: true})}
                      name="name"
                      placeholder="Ex: Название"
                  />
                  {errors.name && <Error>Не введёно название*</Error>}
                </FormFields>
                <FormFields>
                  <FormLabel>Описание</FormLabel>
                  <Textarea
                      value={description}
                      onChange={handleDescriptionChange}
                  />
                  {errors.description && <Error>Не введёно описание*</Error>}
                </FormFields>
              </DrawerBox>
            </Col>
          </Row>
        </Scrollbars>

        <ButtonGroup>
          <Button
              kind={KIND.minimal}
              onClick={closeDrawer}
              overrides={{
                BaseButton: {
                  style: ({ $theme }) => ({
                    width: '50%',
                    borderTopLeftRadius: '3px',
                    borderTopRightRadius: '3px',
                    borderBottomRightRadius: '3px',
                    borderBottomLeftRadius: '3px',
                    marginRight: '15px',
                    color: $theme.colors.red400,
                  }),
                },
              }}
          >
            Отменить
          </Button>

          <Button
              type="submit"
              overrides={{
                BaseButton: {
                  style: ({ $theme }) => ({
                    width: '50%',
                    borderTopLeftRadius: '3px',
                    borderTopRightRadius: '3px',
                    borderBottomRightRadius: '3px',
                    borderBottomLeftRadius: '3px',
                  }),
                },
              }}
          >
            Добавить Категорию
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
})

export default CategoriesUpdateForm;
