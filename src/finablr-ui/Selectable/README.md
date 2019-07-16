# Selectable Component
# Props
| Props         | Type                             | Default                   | Description                                                                                                                                                    |
| :------------ | :------------------------------- | :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id            | string                           |                           | html id to set on the input element for accessibility or tests                                                                                                 |
| name          | string                           |                           | // generates a hidden `<input />` tag with this field name for html forms                                                                                      |
| isMultiple    | boolean                          | false                     | multi-value input                                                                                                                                              |
| value         | any                              | undefined                 | initial field value                                                                                                                                            |
| isRequired    | boolean                          | false                     | if true, On Change it will throw error when its empty                                                                                                          |
| isEnabled     | boolean                          | true                      | whether the Select is disabled or not                                                                                                                          |
| itemCount     | number                           | 5                         | number of options to be displayed per scroll, this will be overridden if `optionStyle` props is used. If maxHeight props defined, it will override `itemCount` |
| placeholder   | string                           | 'Select ...'              | field placeholder, displayed when there's no value                                                                                                             |
| label         | string                           |                           | field label, the field should either label or placeholder. If not label will be prioritized                                                                    |
| searchable    | boolean                          | true                      | whether to enable searching feature or not                                                                                                                     |
| tabIndex      | string or number                 | undefined                 | tabIndex of the control                                                                                                                                        |
| isCreatable   | boolean                          | false                     | create and save custom options                                                                                                                                 |
| isClearable   | boolean                          | true                      | should it be possible to reset value                                                                                                                           |
| selectProps   | object                           |                           | props for select option                                                                                                                                        |
| noResultsText | string                           | customize no results text |
| showCheckBox  | boolean                          | false                     | display checkbox in menu                                                                                                                                       |
| searchBy      | oneOf(["any", "value", "label"]) | any                       | (any, label, value) which option property to filter on                                                                                                         |
| onBlur        | function                         |                           | onBlur handler                                                                                                                                                 |
| chipStyle     | object                           |                           | Add custom css property for chip                                                                                                                               |
| optionProps   | object                           | props for menu            |
| optionStyle   | object                           | custom property for menu  |
| wordWrap      | boolean                          | false                     | wrap text for menu, if wordWrap is set `true` `itemCount` props will not show option count                                                                     |
| maxHeight     | number or string                 | 240px                     | max height for dropdown menu, `itemCount` props will not work if maxHeight is defined                                                                          |
| onChange      | function                         |                           | onChange handler                                                                                                                                               |
| onFocus       | function                         |                           | onFocus handler                                                                                                                                                |
| onClose       | function                         |                           | handler for when the menu closes                                                                                                                               |
| onValueClick  | function                         |                           | onClick handler for value labels                                                                                                                               |
| umClass       | string                           |
| style         | object                           |                           | Add custom css property                                                                                                                                        |
| rtl           | boolean                          | false                     |

# Additional props for Type 2
| Props   | Type    | Default | Description                  |
| :------ | :------ | :------ | :--------------------------- |
| boxtype | boolean | false   | show Border around selectbox |

# Usage
```js
import { Selectable } from "finablr-ui";

Single select:-
    <Selectable
        placeholder="Search a country (start with a)"
        id="react-select-single"
        options={suggestions}
    />

Multi select:-
    <Selectable
        placeholder="Search a country (start with a)"
        id="react-select-single"
        options={suggestions}
        isMultiple
    />

Disabled options:-
    <Selectable
        placeholder="Search a country (start with a)"
        id="react-select-single"
        options={disableSuggestion}
    />

Disable selectable:-
    <Selectable
        isEnabled={false}
        placeholder="Search a country (start with a)"
        id="react-select-single"
        options={disableSuggestion}
    />

Options with checkbox:-
    <Selectable
        placeholder="Search a country (start with a)"
        id="react-select-single"
        options={disableSuggestion}
        isMultiple
        showCheckBox
    />

Custom select props:- 
    <Selectable
        placeholder="Search a country (start with a)"
        id="react-select-single"
        options={disableSuggestion}
        selectProps={{ escapeClearsValue: false }}
    />

RTL:-
    <Selectable
        rtl
        placeholder="ابحث عن بلد"
        id="react-select-single"
        options={arabicSuggestion}
    />

Numeric type:-
    <Selectable
        placeholder="Select"
        id="react-select-single"
        options={numericType}
        searchBy="value"
    />

Required:-
    <Selectable
        placeholder="Search a country (start with a)"
        id="react-select-single"
        options={suggestions}
        isRequired
    />

Creatable:-
    <Selectable
        placeholder="Search a country (start with a)"
        id="react-select-single"
        options={suggestions}
        isCreatable
    />

Disable Searchable:-
    <Selectable
        placeholder="Search a country (start with a)"
        id="react-select-single"
        options={suggestions}
        isMultiple
        searchable={false}
    />

Type 2:-
    <Selectable
        boxtype
        placeholder="Search a country (start with a)"
        id="react-select-single"
        options={suggestions}
    />

Custom styling:-
    <Selectable
        boxtype
        placeholder="Search a country (start with a)"
        id="react-select-single"
        options={suggestions}
        style={{ backgroundColor: "#ccc" }}
    />

Word Wrap:-
    <Selectable
        placeholder="Search a country (start with a)"
        id="react-select-single"
        noResultsText="No Countries Found"
        options={suggestions}
        optionProps={{ wordWrap: true, optionStyle: { padding: 18 } }}
    />

Max Height:-
    <Selectable
        placeholder="Search a country (start with a)"
        id="react-select-single"
        noResultsText="No Countries Found"
        options={suggestions}
        maxHeight={100}
        itemCount={10}
    />
 ```
