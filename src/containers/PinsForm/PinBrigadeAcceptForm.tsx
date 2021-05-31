import React, { useCallback, useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { useForm } from 'react-hook-form';
import { Scrollbars } from 'react-custom-scrollbars';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {FormControl, FormControlLabel, Radio, RadioGroup, withStyles} from "@material-ui/core";
import {green} from "@material-ui/core/colors";

import { useDrawerDispatch } from 'context/DrawerContext';
import Button, { KIND } from 'components/Button';
import { Textarea } from 'components/Textarea';

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
import pins from 'stores/pinStore'
import Image from "components/Image";

type Props = any;

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);


const PinBrigadeAcceptForm: React.FC<Props> = observer((props) => {
  const dispatch = useDrawerDispatch();
  const [description, setDescription] = useState('');
  const [state, setState] = useState('4');
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);
  const { register, errors, handleSubmit, setValue } = useForm({mode: 'onChange'});
  useEffect(() => {
    register({ name: 'description' }, { required: true, minLength: 100, maxLength: 5000 });
    register({ name: 'state' }, { required: true });
  }, [register]);

  const onSubmit = (data) => {
    console.log(data)
    pins.acceptUserPin(parseInt(data.state), data.description).then(() => {
      closeDrawer();
    })
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey)
      handleSubmit(onSubmit)();
  }

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setValue('description', value);
    setDescription(value);
  };

  const handleStateChange = (e) => {
    const value = e.target.value;
    setValue('state', value);
    setState(value);
  };

  const images = pins.pinId.images.map((item, index) => {
    return (<div data-value={index + 1} style={{
      width: "100%",
      height: "720px"
    }}>
      <Image url={item.url} key={item.id} alt={pins.pinId.title}/>
    </div>)
  });
  return (
      <>
        <DrawerTitleWrapper>
          <DrawerTitle>Проверка маркера бригады</DrawerTitle>
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
              <Col lg={12}>
                <AliceCarousel
                    mouseTracking
                    items={images}
                    infinite
                    disableButtonsControls
                    animationType="fadeout"
                    animationDuration={800}
                    controlsStrategy="alternate"
                />
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <FieldDetails>
                  <h2>{Date.parse(pins.pinId.creationDate)}</h2>
                  <h3 style={{fontStyle: "bold"}}>Название: {pins.pinId.title}</h3>
                </FieldDetails>
              </Col>
              <Col lg={8}>
                <DrawerBox>
                  <FormFields>
                    <FormLabel>Описание</FormLabel>
                    <FieldDetails style={{textAlign: "left"}}>
                      {pins.pinId.description}<br/>
                      <h5>{pins.pinId.tags.map(tag => {
                        return(`#${tag.title}     `)
                      })}</h5>
                    </FieldDetails>
                  </FormFields>
                </DrawerBox>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <FieldDetails>
                  Напишите ответ об отказе или наоборот о подтверждений маркера и, по каким причинам вы подтвердили или отменили маркер.<br/>
                </FieldDetails>
              </Col>
              <Col lg={8}>
                <DrawerBox>
                  <FormFields>
                    <FormLabel>Состояние маркера</FormLabel>
                    <FormControl component="fieldset">
                      <RadioGroup aria-label="Состояние маркера" name="state" value={state} onChange={handleStateChange}>
                        <FormControlLabel value='4' control={<GreenRadio />} label="Подтвердить" />
                        <FormControlLabel value='3' control={<Radio />} label="Отклонить" />
                      </RadioGroup>
                    </FormControl>
                    {errors.state && <Error>Не выбрано состояние маркера*</Error>}
                  </FormFields>
                </DrawerBox>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <FieldDetails>
                  Напишите описание подробнее.<br/>
                </FieldDetails>
              </Col>
              <Col lg={8}>
                <DrawerBox>
                  <FormFields>
                    <FormLabel>Описание</FormLabel>
                    <Textarea
                        value={description}
                        onChange={handleDescriptionChange}
                        onKeyDown={handleKeyDown}
                    />
                    {errors.description && <Error>Описание должно быть больше 100 символов и меньше 5000*</Error>}
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
              Отправить
            </Button>
          </ButtonGroup>
        </Form>
      </>
  );
});

export default PinBrigadeAcceptForm;
