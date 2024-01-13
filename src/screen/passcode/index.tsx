import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { numbers } from '../../constants';
import { style } from './style';

const Passcode = (props: any) => {
  const { navigation } = props;
  const [state, setState] = useState('new');
  const [verify, setVerify] = useState<number[] | null[] | string[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [passcode, setPasscode] = useState<number[] | null[] | string[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const addToPasscode = (number: number | null | string) => {
    let slotFilled = false;
    if (number === null) return null;

    if (state === 'new') {
      passcode.map((slot: any, index: number) => {
        if (slot === null && !slotFilled) {
          passcode[index] = number;
          //@ts-expect-error
          setPasscode([...passcode]);
          slotFilled = true;
        }
      });
    }

    if (state === 'verify') {
      verify.map((slot: any, index: number) => {
        if (slot === null && !slotFilled) {
          verify[index] = number;
          //@ts-expect-error
          setVerify([...verify]);
          slotFilled = true;
        }
      });
    }
  };

  const removePasscode = () => {
    if (state === 'new') {
      setPasscode([null, null, null, null, null]);
    }

    if (state === 'verify') {
      setVerify([null, null, null, null, null]);
    }
  };

  useEffect(() => {
    let totalPasscodes = 0;

    if (state === 'new') {
      passcode.map((slot: any) => {
        if (slot !== null) {
          totalPasscodes++;
        }
      });
    }

    if (totalPasscodes === 5 && state === 'new') {
      setState('verify');
    }
  }, [passcode]);

  useEffect(() => {
    let totalPasscodes = 0;

    if (state === 'verify') {
      verify.map((slot: any) => {
        if (slot !== null) {
          totalPasscodes++;
        }
      });
    }

    if (totalPasscodes === 5 && state === 'verify') {
      let match = true;

      verify.map((slot: any, index) => {
        if (slot !== passcode[index]) {
          match = false;
        }
      });

      if (match) {
        navigation.replace('Home');
      } else {
        setState('new');
        setPasscode([null, null, null, null, null]);
        setVerify([null, null, null, null, null]);
      }
    }
  }, [verify]);

  return (
    <View style={style.default}>
      <View style={style.passcodeContainer}>
        {state === 'new' ? (
          <Text style={style.title}>{'CREATE NEW PASSCODE'}</Text>
        ) : state === 'verify' ? (
          <Text style={style.title}>{'CONFIRM PASSCODE'}</Text>
        ) : (
          <Text style={style.title}>{'CREATE NEW PASSCODE'}</Text>
        )}
      </View>
      <View style={style.passcodeContainer}>
        {state === 'new' ? (
          <>
            {passcode.map((number: any, index) => {
              return (
                <View key={index} style={style.passcodeInput}>
                  {number !== null ? (
                    <View style={style.passcodePlaceholder} />
                  ) : null}
                </View>
              );
            })}
          </>
        ) : state === 'verify' ? (
          <>
            {verify.map((number: any, index) => {
              return (
                <View key={index} style={style.passcodeInput}>
                  {number !== null ? (
                    <View style={style.passcodePlaceholder} />
                  ) : null}
                </View>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </View>
      <View style={style.buttonContainer}>
        {numbers.map((number: number | null | string) => {
          let buttonType = style.codeButton;
          let buttonText = style.buttonText;

          if (number === null) {
            buttonType = style.codeButtonNull;
          }

          if (number === 'X') {
            buttonType = style.codeButtonDelete;
            buttonText = style.buttonTextDelete;
          }

          return (
            <TouchableOpacity
              key={number}
              style={buttonType}
              onPress={
                number === 'X'
                  ? () => removePasscode()
                  : () => addToPasscode(number)
              }
            >
              <Text style={buttonText}>{number}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export { Passcode };
