import React, { useCallback } from 'react';
import { observer } from "mobx-react-lite";
import { useForm } from 'react-hook-form';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDrawerDispatch } from 'context/DrawerContext';
import Input from 'components/Input';
import Button, { KIND } from 'components/Button';

import DrawerBox from 'components/DrawerBox';
import { Row, Col } from 'components/FlexBox';
import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from '../DrawerItems/DrawerItems.style';
import { FormFields, FormLabel, Error } from 'components/FormFields';
import brigadeStore from 'stores/brigadesStore'

type Props = any;

const ModeratorsForm: React.FC<Props> = observer((props) => {
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);
  const { register, errors, handleSubmit } = useForm({mode: 'onChange', defaultValues: brigadeStore.getBrigadeById});

  const onSubmit = (data) => {
    brigadeStore.editBrigade(data.firstName, data.lastName, data.brigadeName, data.brigadeAddress, data.brigadeCount, data.login, data.password).then(() => {
      closeDrawer();
    })
  };

  return (
      <>
        <DrawerTitleWrapper>
          <DrawerTitle>Изменить Бригаду</DrawerTitle>
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
                <FieldDetails>
                  Введите данные о модераторе для его добавление <br/>
                  Логин должен содержать минимум 6 символов <br/>
                  Пароль должен содержать минимум 8 символов и содержать минимум 1 заглавный символ и не алфавитный символ
                </FieldDetails>
              </Col>

              <Col lg={8}>
                <DrawerBox>
                  <FormFields>
                    <FormLabel>Имя</FormLabel>
                    <Input
                        inputRef={register({ required: true, minLength: 2 })}
                        name="firstName"
                        placeholder="Ex: Имя главного бригадира"
                    />
                    {errors.firstName && <Error>Имя должно быть введено*</Error>}
                  </FormFields>
                  <FormFields>
                    <FormLabel>Фамилия</FormLabel>
                    <Input
                        inputRef={register({ required: true, minLength: 2 })}
                        name="lastName"
                        placeholder="Ex: Фамилия главного бригадира"
                    />
                    {errors.lastName && <Error>Фамилия должна быть введена*</Error>}
                  </FormFields>
                  <FormFields>
                    <FormLabel>Название бригады</FormLabel>
                    <Input
                        inputRef={register({ required: true, minLength: 8, maxLength: 200 })}
                        name="brigadeName"
                        placeholder="Ex: Наименование бригады"
                    />
                    {errors.brigadeName && <Error>Название бригады должно быть от 8 до 200 символов*</Error>}
                  </FormFields>
                  <FormFields>
                    <FormLabel>Адресс бригады</FormLabel>
                    <Input
                        inputRef={register({ required: true, minLength: 4, maxLength: 300 })}
                        name="brigadeWorkAddress"
                        placeholder="Ex: Адресс бригады"
                    />
                    {errors.brigadeWorkAddress && <Error>Адресс бригады должнен быть от 4 до 300 символов*</Error>}
                  </FormFields>
                  <FormFields>
                    <FormLabel>Количество рабочих в бригаде</FormLabel>
                    <Input
                        inputRef={register({ required: true})}
                        name="brigadeWorkAddress"
                        type="number"
                        placeholder="Ex: Кол рабочих"
                    />
                    {errors.brigadeCount && <Error>Введите количество рабочих в бригаде*</Error>}
                  </FormFields>
                  <FormFields>
                    <FormLabel>Фамилия</FormLabel>
                    <Input
                        inputRef={register({ required: true, minLength: 6, maxLength: 20 })}
                        name="lastName"
                        placeholder="Ex: Фамилия главного бригадира"
                    />
                    {errors.lastName && <Error>Фамилия должна быть введена*</Error>}
                  </FormFields>
                  <FormFields>
                    <FormLabel>Логин</FormLabel>
                    <Input
                        inputRef={register({ required: true, minLength: 6, maxLength: 20 })}
                        name="login"
                        placeholder="Ex: Логин модератора"
                    />
                    {errors.login && <Error>Логин должен содержать минимум 6 символов*</Error>}
                  </FormFields>
                  <FormFields>
                    <FormLabel>Пароль</FormLabel>
                    <Input
                        type="password"
                        inputRef={register({ required: true, minLength: 8, maxLength: 20, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/i })}
                        name="password"
                        placeholder="Ex: Пароль модератора"
                    />
                    {errors.password && <Error>Пароль должен содержать минимум 8 символов и содержать минимум 1 заглавный символ и не алфавитный символ</Error>}
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
              Добавить Модератора
            </Button>
          </ButtonGroup>
        </Form>
      </>
  );
});

export default ModeratorsForm;
