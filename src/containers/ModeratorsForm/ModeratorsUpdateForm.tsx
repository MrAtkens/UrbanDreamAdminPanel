import React, {useCallback} from 'react';
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

import moderators from 'stores/moderatorsStore'
import {Error} from "../../components/FormFields";
import Checkbox from "../../components/CheckBox";

type Props = any;

const ModeratorsUpdateForm: React.FC<Props> = observer(() => {
  const [checked, setChecked] = React.useState(false);
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);
  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: moderators.getModeratorById
  });
  const onSubmit = (data) => {
    moderators.editModerator(data.login, data.password).then(() => {
      closeDrawer();
    })
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Изменить Модератора</DrawerTitle>
      </DrawerTitleWrapper>

      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ height: '100%' }}
        noValidate
      >
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
                Введите данные о модераторе для его изменение <br/>
                Логин должен содержать минимум 6 символов <br/>
                Пароль должен содержать минимум 8 символов и содержать минимум 1 заглавный символ и не алфавитный символ
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Логин</FormLabel>
                  <Input
                      type="text"
                      placeholder="Ex: Логин модератора"
                      inputRef={register({ required: true, minLength: 6, maxLength: 20 })}
                      name="login"
                  />
                  {errors.login && <Error>Логин должен содержать минимум 6 символов*</Error>}
                </FormFields>
                <FormFields>
                  <Checkbox
                      checked={checked}
                      onChange={(e) => setChecked(e.target.checked)}
                      inputRef={register}
                      name="agreement_check"
                      overrides={{
                        Label: {
                          style: ({ $theme }) => ({
                            color: $theme.colors.textNormal,
                          }),
                        },
                      }}
                  >
                    Разрешение на изменение пароля
                  </Checkbox>
                </FormFields>
                {checked && (<FormFields>
                  <FormLabel>Пароль</FormLabel>
                  <Input
                      type="password"
                      placeholder="Ex: Пароль модератора"
                      inputRef={register({ required: true, minLength: 8, maxLength: 20, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/i })}
                      name="password"
                  />
                  {errors.password && <Error>Пароль должен содержать минимум 8 символов и содержать минимум 1 заглавный символ и не алфавитный символ</Error>}
                </FormFields>)}
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
            Изменить Модератора
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
})

export default ModeratorsUpdateForm;
