import * as React from 'react';
import styles from './ReactForm.module.scss';
import type { IReactFormProps } from './IReactFormProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { IButtonProps } from '@fluentui/react/lib/Button';
import { setVirtualParent } from '@fluentui/dom-utilities';
import { FocusTrapZone } from '@fluentui/react/lib/FocusTrapZone';
import { Checkbox } from '@fluentui/react/lib/Checkbox';

import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { Stack, IStackProps, IStackStyles, IStackTokens } from '@fluentui/react/lib/Stack';

import { Dropdown, IDropdown } from '@fluentui/react/lib/Dropdown';
import { PrimaryButton } from '@fluentui/react/lib/Button';


const dropdownStyles = { dropdown: { width: 300 } };

const stackTokens = { childrenGap: 50 };
const iconProps = { iconName: 'Calendar' };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

const overflowProps: IButtonProps = { ariaLabel: 'More commands' };

export const DropdownRequiredExample: React.FunctionComponent = () => {
  const dropdownRef = React.createRef<IDropdown>();
  const onSetFocus = (): void | undefined => {
    return dropdownRef.current?.focus(true);
  };

  const stackTokens: IStackTokens = { childrenGap: 20 };

  return (
    <Stack tokens={stackTokens} verticalAlign="end">
      <Stack horizontal tokens={stackTokens} verticalAlign="end">
        <Dropdown
          componentRef={dropdownRef}
          placeholder="Select an option"
          label="Required dropdown example"
          options={[
            { key: 'A', text: 'Option a', title: 'I am option a.' },
            { key: 'B', text: 'Option b' },
            { key: 'C', text: 'Option c', disabled: true },
            { key: 'D', text: 'Option d' },
            { key: 'E', text: 'Option e' },
          ]}
          required
          styles={dropdownStyles}
        />
        <PrimaryButton
          text="Set focus"
          // eslint-disable-next-line react/jsx-no-bind
          onClick={onSetFocus}
        />
      </Stack>
      <Dropdown
        placeholder="Required with no label"
        ariaLabel="Required dropdown example"
        options={[
          { key: 'A', text: 'Option a', title: 'I am option a.' },
          { key: 'B', text: 'Option b' },
          { key: 'C', text: 'Option c', disabled: true },
          { key: 'D', text: 'Option d' },
          { key: 'E', text: 'Option e' },
        ]}
        required={true}
        styles={dropdownStyles}
      />
    </Stack>
  );
};

export const TextFieldBasicExample: React.FunctionComponent = () => {
  return (
    <form noValidate autoComplete="on">
      <Stack horizontal tokens={stackTokens} styles={stackStyles}>
        <Stack {...columnProps}>
          <TextField label="Standard" />
          <TextField label="Disabled" disabled defaultValue="I am disabled" />
          <TextField label="Read-only" readOnly defaultValue="I am read-only" />
          <TextField label="Required " required />
          <TextField ariaLabel="Required without visible label" required />
          <TextField label="With error message" errorMessage="Error message" />
        </Stack>
        <Stack {...columnProps}>
          <MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" title="A 10 digit number" />
          <TextField label="With an icon" iconProps={iconProps} />
          <TextField label="With placeholder" placeholder="Please enter text here" />
          <TextField label="Disabled with placeholder" disabled placeholder="I am disabled" />
          {/* All password fields should be rendered inside of a form */}
          <TextField
            label="Password with reveal button"
            type="password"
            canRevealPassword
            revealPasswordAriaLabel="Show password"
          />
        </Stack>
      </Stack>
    </form>
  );
};

const _items: ICommandBarItemProps[] = [

  {
    key: 'upload',
    text: 'Carregar Arquivo',
    iconProps: { iconName: 'Upload' },
    onClick: (ev?: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement> | undefined) => {
      ev?.persist();

      // eslint-disable-next-line no-void
      void Promise.resolve().then(() => {
        const inputElement = document.createElement('input');
        inputElement.style.visibility = 'hidden';
        inputElement.setAttribute('type', 'file');

        document.body.appendChild(inputElement);

        const target = ev?.target as HTMLElement | undefined;

        if (target) {
          setVirtualParent(inputElement, target);
        }

        inputElement.click();

        if (target) {
          setVirtualParent(inputElement, null);
        }

        setTimeout(() => {
          inputElement.remove();
        }, 10000);
      });
    },
  },
];





export const CommandBarBasicExample: React.FunctionComponent = () => {
  const [enableFocusTrap, setEnableFocusTrap] = React.useState(false);

  const onChangeEnableFocusTrap = React.useCallback(
    (ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, checked?: boolean | undefined) => {
      setEnableFocusTrap(!!checked);
    },
    [],
  );

  return (
    <FocusTrapZone disabled={!enableFocusTrap}>
      <CommandBar
        items={_items}

        overflowButtonProps={overflowProps}

        ariaLabel="Inbox actions"
        primaryGroupAriaLabel="Email actions"
        farItemsGroupAriaLabel="More actions"
      />
      <Checkbox label="Trap focus around command bar" checked={enableFocusTrap} onChange={onChangeEnableFocusTrap} />
    </FocusTrapZone>
  );
};



export default class ReactForm extends React.Component<IReactFormProps, {}> {
  public render(): React.ReactElement<IReactFormProps> {
    const {
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <section className={`${styles.reactForm} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
           <h2>Olá, {escape(userDisplayName)}!</h2>
          <form noValidate autoComplete="on">
            <Stack horizontal tokens={stackTokens} styles={stackStyles}>
              <Stack {...columnProps}>
                <TextField label="Documento" placeholder="Digite o nome do Documento" required />
                <Dropdown
                  placeholder="Selecione a área de aprovaçãol"
                  ariaLabel="Required dropdown example"
                  options={[
                    { key: 'A', text: 'Option a', title: 'I am option a.' },
                    { key: 'B', text: 'Option b' },
                    { key: 'C', text: 'Option c', disabled: true },
                    { key: 'D', text: 'Option d' },
                    { key: 'E', text: 'Option e' },
                  ]}
                  required={true}
                  styles={dropdownStyles}
                /> 
              </Stack>
              <Stack {...columnProps}>
                  <CommandBar items={_items}/>
              </Stack>             
            </Stack>
          </form>
        </div>
      </section>
    );
  }
}
