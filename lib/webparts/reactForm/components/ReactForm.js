var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import styles from './ReactForm.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { CommandBar } from '@fluentui/react/lib/CommandBar';
import { setVirtualParent } from '@fluentui/dom-utilities';
import { FocusTrapZone } from '@fluentui/react/lib/FocusTrapZone';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { Stack } from '@fluentui/react/lib/Stack';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { PrimaryButton } from '@fluentui/react/lib/Button';
var dropdownStyles = { dropdown: { width: 300 } };
var stackTokens = { childrenGap: 50 };
var iconProps = { iconName: 'Calendar' };
var stackStyles = { root: { width: 650 } };
var columnProps = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 300 } },
};
var overflowProps = { ariaLabel: 'More commands' };
export var DropdownRequiredExample = function () {
    var dropdownRef = React.createRef();
    var onSetFocus = function () {
        var _a;
        return (_a = dropdownRef.current) === null || _a === void 0 ? void 0 : _a.focus(true);
    };
    var stackTokens = { childrenGap: 20 };
    return (React.createElement(Stack, { tokens: stackTokens, verticalAlign: "end" },
        React.createElement(Stack, { horizontal: true, tokens: stackTokens, verticalAlign: "end" },
            React.createElement(Dropdown, { componentRef: dropdownRef, placeholder: "Select an option", label: "Required dropdown example", options: [
                    { key: 'A', text: 'Option a', title: 'I am option a.' },
                    { key: 'B', text: 'Option b' },
                    { key: 'C', text: 'Option c', disabled: true },
                    { key: 'D', text: 'Option d' },
                    { key: 'E', text: 'Option e' },
                ], required: true, styles: dropdownStyles }),
            React.createElement(PrimaryButton, { text: "Set focus", 
                // eslint-disable-next-line react/jsx-no-bind
                onClick: onSetFocus })),
        React.createElement(Dropdown, { placeholder: "Required with no label", ariaLabel: "Required dropdown example", options: [
                { key: 'A', text: 'Option a', title: 'I am option a.' },
                { key: 'B', text: 'Option b' },
                { key: 'C', text: 'Option c', disabled: true },
                { key: 'D', text: 'Option d' },
                { key: 'E', text: 'Option e' },
            ], required: true, styles: dropdownStyles })));
};
export var TextFieldBasicExample = function () {
    return (React.createElement("form", { noValidate: true, autoComplete: "on" },
        React.createElement(Stack, { horizontal: true, tokens: stackTokens, styles: stackStyles },
            React.createElement(Stack, __assign({}, columnProps),
                React.createElement(TextField, { label: "Standard" }),
                React.createElement(TextField, { label: "Disabled", disabled: true, defaultValue: "I am disabled" }),
                React.createElement(TextField, { label: "Read-only", readOnly: true, defaultValue: "I am read-only" }),
                React.createElement(TextField, { label: "Required ", required: true }),
                React.createElement(TextField, { ariaLabel: "Required without visible label", required: true }),
                React.createElement(TextField, { label: "With error message", errorMessage: "Error message" })),
            React.createElement(Stack, __assign({}, columnProps),
                React.createElement(MaskedTextField, { label: "With input mask", mask: "m\\ask: (999) 999 - 9999", title: "A 10 digit number" }),
                React.createElement(TextField, { label: "With an icon", iconProps: iconProps }),
                React.createElement(TextField, { label: "With placeholder", placeholder: "Please enter text here" }),
                React.createElement(TextField, { label: "Disabled with placeholder", disabled: true, placeholder: "I am disabled" }),
                React.createElement(TextField, { label: "Password with reveal button", type: "password", canRevealPassword: true, revealPasswordAriaLabel: "Show password" })))));
};
var _items = [
    {
        key: 'upload',
        text: 'Carregar Arquivo',
        iconProps: { iconName: 'Upload' },
        onClick: function (ev) {
            ev === null || ev === void 0 ? void 0 : ev.persist();
            // eslint-disable-next-line no-void
            void Promise.resolve().then(function () {
                var inputElement = document.createElement('input');
                inputElement.style.visibility = 'hidden';
                inputElement.setAttribute('type', 'file');
                document.body.appendChild(inputElement);
                var target = ev === null || ev === void 0 ? void 0 : ev.target;
                if (target) {
                    setVirtualParent(inputElement, target);
                }
                inputElement.click();
                if (target) {
                    setVirtualParent(inputElement, null);
                }
                setTimeout(function () {
                    inputElement.remove();
                }, 10000);
            });
        },
    },
];
export var CommandBarBasicExample = function () {
    var _a = React.useState(false), enableFocusTrap = _a[0], setEnableFocusTrap = _a[1];
    var onChangeEnableFocusTrap = React.useCallback(function (ev, checked) {
        setEnableFocusTrap(!!checked);
    }, []);
    return (React.createElement(FocusTrapZone, { disabled: !enableFocusTrap },
        React.createElement(CommandBar, { items: _items, overflowButtonProps: overflowProps, ariaLabel: "Inbox actions", primaryGroupAriaLabel: "Email actions", farItemsGroupAriaLabel: "More actions" }),
        React.createElement(Checkbox, { label: "Trap focus around command bar", checked: enableFocusTrap, onChange: onChangeEnableFocusTrap })));
};
var ReactForm = /** @class */ (function (_super) {
    __extends(ReactForm, _super);
    function ReactForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReactForm.prototype.render = function () {
        var _a = this.props, hasTeamsContext = _a.hasTeamsContext, userDisplayName = _a.userDisplayName;
        return (React.createElement("section", { className: "".concat(styles.reactForm, " ").concat(hasTeamsContext ? styles.teams : '') },
            React.createElement("div", { className: styles.welcome },
                React.createElement("h2", null,
                    "Ol\u00E1, ",
                    escape(userDisplayName),
                    "!"),
                React.createElement("form", { noValidate: true, autoComplete: "on" },
                    React.createElement(Stack, { horizontal: true, tokens: stackTokens, styles: stackStyles },
                        React.createElement(Stack, __assign({}, columnProps),
                            React.createElement(TextField, { label: "Documento", placeholder: "Digite o nome do Documento", required: true }),
                            React.createElement(Dropdown, { placeholder: "Selecione a \u00E1rea de aprova\u00E7\u00E3ol", ariaLabel: "Required dropdown example", options: [
                                    { key: 'A', text: 'Option a', title: 'I am option a.' },
                                    { key: 'B', text: 'Option b' },
                                    { key: 'C', text: 'Option c', disabled: true },
                                    { key: 'D', text: 'Option d' },
                                    { key: 'E', text: 'Option e' },
                                ], required: true, styles: dropdownStyles })),
                        React.createElement(Stack, __assign({}, columnProps),
                            React.createElement(CommandBar, { items: _items })))))));
    };
    return ReactForm;
}(React.Component));
export default ReactForm;
//# sourceMappingURL=ReactForm.js.map