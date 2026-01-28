"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";

const _interactionsData = JSON.parse(
    '{"events":{"e":{"id":"e","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a","playInReverse":false,"autoStopEventId":"e-2"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0d6c7e72-58f3-41f6-b958-6f64d13bf808","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0d6c7e72-58f3-41f6-b958-6f64d13bf808","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1740144381833},"e-2":{"id":"e-2","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-2","playInReverse":false,"autoStopEventId":"e"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0d6c7e72-58f3-41f6-b958-6f64d13bf808","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0d6c7e72-58f3-41f6-b958-6f64d13bf808","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1740144381833},"e-3":{"id":"e-3","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-3","playInReverse":false,"autoStopEventId":"e-4"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0d6c7e72-58f3-41f6-b958-6f64d13bf899","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0d6c7e72-58f3-41f6-b958-6f64d13bf899","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1740144381833},"e-4":{"id":"e-4","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-4","playInReverse":false,"autoStopEventId":"e-3"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0d6c7e72-58f3-41f6-b958-6f64d13bf899","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0d6c7e72-58f3-41f6-b958-6f64d13bf899","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1740144381833}},"actionLists":{"a":{"id":"a","title":"[Nav] Open Mega Nav","actionItemGroups":[{"actionItems":[{"id":"a-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".mega-nav_dropdown-list-wrapper","selectorGuids":["efc70848-d64b-34ac-4f11-31dde95fc07f"]},"yValue":-1,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}},{"id":"a-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".mega-nav_dropdown-list-wrapper","selectorGuids":["efc70848-d64b-34ac-4f11-31dde95fc07f"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"easeInOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".mega-nav_dropdown-list-wrapper","selectorGuids":["efc70848-d64b-34ac-4f11-31dde95fc07f"]},"yValue":0,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}},{"id":"a-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeInOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".mega-nav_dropdown-list-wrapper","selectorGuids":["efc70848-d64b-34ac-4f11-31dde95fc07f"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1740143896872},"a-2":{"id":"a-2","title":"[Nav] Close Mega Nav","actionItemGroups":[{"actionItems":[{"id":"a-2-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"easeOut","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".mega-nav_dropdown-list-wrapper","selectorGuids":["efc70848-d64b-34ac-4f11-31dde95fc07f"]},"yValue":-1,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}},{"id":"a-2-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".mega-nav_dropdown-list-wrapper","selectorGuids":["efc70848-d64b-34ac-4f11-31dde95fc07f"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1740143896872},"a-3":{"id":"a-3","title":"[Nav] Open Drop Down","actionItemGroups":[{"actionItems":[{"id":"a-3-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".nav-menu_dropdown-list-wrapper","selectorGuids":["efc70848-d64b-34ac-4f11-31dde95fc080"]},"yValue":-1,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}},{"id":"a-3-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".nav-menu_dropdown-list-wrapper","selectorGuids":["efc70848-d64b-34ac-4f11-31dde95fc080"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-3-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"easeInOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".nav-menu_dropdown-list-wrapper","selectorGuids":["efc70848-d64b-34ac-4f11-31dde95fc080"]},"yValue":0,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}},{"id":"a-3-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeInOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".nav-menu_dropdown-list-wrapper","selectorGuids":["efc70848-d64b-34ac-4f11-31dde95fc080"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1740143896872},"a-4":{"id":"a-4","title":"[Nav] Close Drop Down","actionItemGroups":[{"actionItems":[{"id":"a-4-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"easeOut","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".nav-menu_dropdown-list-wrapper","selectorGuids":["efc70848-d64b-34ac-4f11-31dde95fc080"]},"yValue":-1,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}},{"id":"a-4-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".nav-menu_dropdown-list-wrapper","selectorGuids":["efc70848-d64b-34ac-4f11-31dde95fc080"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1740143896872}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function Navigation(
    {
        as: _Component = _Builtin.Block
    }
) {
    _interactions.useInteractions(_interactionsData);

    return (
        <_Component className="nav is-secondary" tag="div"><_Builtin.NavbarWrapper
                className="nav_container"
                tag="div"
                data-animation="default"
                data-easing2="ease"
                data-easing="ease"
                data-collapse="medium"
                role="banner"
                data-no-scroll="1"
                data-duration="400"
                config={{
                    easing: "ease",
                    easing2: "ease",
                    duration: 400,
                    docHeight: false,
                    noScroll: true,
                    animation: "default",
                    collapse: "medium"
                }}><_Builtin.Block
                    className="nav_left"
                    id="w-node-_0d6c7e72-58f3-41f6-b958-6f64d13bf7fd-d13bf7fb"
                    tag="div"><_Builtin.Link
                        className="nav_logo"
                        id="w-node-_0d6c7e72-58f3-41f6-b958-6f64d13bf7fe-d13bf7fb"
                        button={false}
                        block="inline"
                        options={{
                            href: "#"
                        }}><_Builtin.Block className="nav_logo-icon" tag="div"><_Builtin.DOM
                                tag="svg"
                                slot=""
                                width="100%"
                                height="100%"
                                viewBox="0 0 33 33"
                                preserveAspectRatio="xMidYMid meet"><_Builtin.DOM
                                    tag="path"
                                    slot=""
                                    d="M28,0H5C2.24,0,0,2.24,0,5v23c0,2.76,2.24,5,5,5h23c2.76,0,5-2.24,5-5V5c0-2.76-2.24-5-5-5ZM29,17c-6.63,0-12,5.37-12,12h-1c0-6.63-5.37-12-12-12v-1c6.63,0,12-5.37,12-12h1c0,6.63,5.37,12,12,12v1Z"
                                    fill="currentColor" /></_Builtin.DOM></_Builtin.Block><_Builtin.Block
                            className="paragraph_large margin-bottom_none"
                            tag="div"
                            data-brand-name="true">{"Age Care Information"}</_Builtin.Block></_Builtin.Link></_Builtin.Block><_Builtin.Block
                    className="nav_right"
                    id="w-node-_0d6c7e72-58f3-41f6-b958-6f64d13bf804-d13bf7fb"
                    tag="div"><_Builtin.NavbarMenu
                        id="w-node-_0d6c7e72-58f3-41f6-b958-6f64d13bf805-d13bf7fb"
                        tag="nav"
                        role="navigation"><_Builtin.List tag="ul" role="list" unstyled={true}><_Builtin.ListItem><_Builtin.DropdownWrapper
                                    data-w-id="0d6c7e72-58f3-41f6-b958-6f64d13bf808"
                                    tag="div"
                                    delay={0}
                                    hover={false}><_Builtin.DropdownToggle className="nav_link" tag="div"><_Builtin.Block tag="div">{"Services"}</_Builtin.Block><_Builtin.Icon
                                            widget={{
                                                type: "icon",
                                                icon: "dropdown-toggle"
                                            }} /></_Builtin.DropdownToggle><_Builtin.DropdownList tag="nav"><_Builtin.Block className="mega-nav_dropdown-list-wrapper" tag="div"><_Builtin.List
                                                className="grid_3-col tablet-1-col gap-medium margin-bottom_none"
                                                tag="ul"
                                                role="list"
                                                unstyled={true}><_Builtin.ListItem
                                                    className="w-node-_0d6c7e72-58f3-41f6-b958-6f64d13bf810-d13bf7fb"
                                                    id="w-node-_016f5a0a-5b63-edde-82c5-e2b2ad6d2e6d-ad6d2e56"><_Builtin.Grid className="grid_3-col tablet-1-col gap-small"><_Builtin.Block tag="div"><_Builtin.Block className="eyebrow" tag="div">{"Care Options"}</_Builtin.Block><_Builtin.List tag="ul" role="list" unstyled={true}><_Builtin.ListItem
                                                                    className="margin-bottom_none"
                                                                    id="w-node-_0d6c7e72-58f3-41f6-b958-6f64d13bf816-d13bf7fb"><_Builtin.Link
                                                                        button={false}
                                                                        block="inline"
                                                                        options={{
                                                                            href: "#"
                                                                        }}><_Builtin.Block className="icon is-medium" tag="div"><_Builtin.DOM
                                                                                tag="svg"
                                                                                slot=""
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="100%"
                                                                                height="100%"
                                                                                viewBox="0 0 32 32"
                                                                                fill="currentColor"><_Builtin.DOM
                                                                                    tag="path"
                                                                                    slot=""
                                                                                    d="m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
                                                                                    stroke-linejoin="round" /></_Builtin.DOM></_Builtin.Block><_Builtin.Block
                                                                            className="w-node-_0d6c7e72-58f3-41f6-b958-6f64d13bf81b-d13bf7fb"
                                                                            id="w-node-_016f5a0a-5b63-edde-82c5-e2b2ad6d2e78-ad6d2e56"
                                                                            tag="div"><_Builtin.Block tag="div"><_Builtin.Strong>{"Home Care"}</_Builtin.Strong></_Builtin.Block><_Builtin.Block className="paragraph_small text-color_secondary" tag="div">{"Daily living support at home."}</_Builtin.Block></_Builtin.Block></_Builtin.Link></_Builtin.ListItem><_Builtin.ListItem
                                                                    className="margin-bottom_none"
                                                                    id="w-node-_0d6c7e72-58f3-41f6-b958-6f64d13bf821-d13bf7fb"><_Builtin.Link
                                                                        button={false}
                                                                        block="inline"
                                                                        options={{
                                                                            href: "#"
                                                                        }}><_Builtin.Block className="icon is-medium" tag="div"><_Builtin.DOM
                                                                                tag="svg"
                                                                                slot=""
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="100%"
                                                                                height="100%"
                                                                                viewBox="0 0 32 32"
                                                                                fill="currentColor"><_Builtin.DOM
                                                                                    tag="path"
                                                                                    slot=""
                                                                                    d="m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
                                                                                    stroke-linejoin="round" /></_Builtin.DOM></_Builtin.Block><_Builtin.Block
                                                                            className="w-node-_0d6c7e72-58f3-41f6-b958-6f64d13bf826-d13bf7fb"
                                                                            id="w-node-f807f6d1-1643-a581-cf58-1ddfb132bd6d-ad6d2e56"
                                                                            tag="div"><_Builtin.Block tag="div"><_Builtin.Strong>{"Respite Care"}</_Builtin.Strong></_Builtin.Block><_Builtin.Block className="paragraph_small text-color_secondary" tag="div">{"Caregiver breaks made easy."}</_Builtin.Block></_Builtin.Block></_Builtin.Link></_Builtin.ListItem><_Builtin.ListItem
                                                                    className="margin-bottom_none"
                                                                    id="w-node-_0d6c7e72-58f3-41f6-b958-6f64d13bf82c-d13bf7fb"><_Builtin.Link
                                                                        button={false}
                                                                        block="inline"
                                                                        options={{
                                                                            href: "#"
                                                                        }}><_Builtin.Block className="icon is-medium" tag="div"><_Builtin.DOM
                                                                                tag="svg"
                                                                                slot=""
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="100%"
                                                                                height="100%"
                                                                                viewBox="0 0 32 32"
                                                                                fill="currentColor"><_Builtin.DOM
                                                                                    tag="path"
                                                                                    slot=""
                                                                                    d="m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
                                                                                    stroke-linejoin="round" /></_Builtin.DOM></_Builtin.Block><_Builtin.Block
                                                                            className="w-node-_0d6c7e72-58f3-41f6-b958-6f64d13bf831-d13bf7fb"
                                                                            id="w-node-_81a98210-c6c4-fcf3-e0c3-108b18c0cc9b-ad6d2e56"
                                                                            tag="div"><_Builtin.Block tag="div"><_Builtin.Strong>{"Memory Care"}</_Builtin.Strong></_Builtin.Block><_Builtin.Block className="paragraph_small text-color_secondary" tag="div">{"Dementia-focused assistance."}</_Builtin.Block></_Builtin.Block></_Builtin.Link></_Builtin.ListItem></_Builtin.List></_Builtin.Block><_Builtin.Block id="w-node-_0d6c7e72-58f3-41f6-b958-6f64d13bf837-d13bf7fb" tag="div"><_Builtin.Block className="eyebrow" tag="div">{"Resources"}</_Builtin.Block><_Builtin.List tag="ul" role="list" unstyled={true}><_Builtin.ListItem
                                                                    className="margin-bottom_none"
                                                                    id="w-node-_0d6c7e72-58f3-41f6-b958-6f64d13bf83b-d13bf7fb"><_Builtin.Link
                                                                        button={false}
                                                                        block="inline"
                                                                        options={{
                                                                            href: "#"
                                                                        }}><_Builtin.Block className="icon is-medium" tag="div"><_Builtin.DOM
                                                                                tag="svg"
                                                                                slot=""
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="100%"
                                                                                height="100%"
                                                                                viewBox="0 0 32 32"
                                                                                fill="currentColor"><_Builtin.DOM
                                                                                    tag="path"
                                                                                    slot=""
                                                                                    d="m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
                                                                                    stroke-linejoin="round" /></_Builtin.DOM></_Builtin.Block><_Builtin.Block
                                                                            className="w-node-_0d6c7e72-58f3-41f6-b958-6f64d13bf840-d13bf7fb"
                                                                            id="w-node-_9f30640f-1f64-d0c6-60e9-e2b460cf1f47-ad6d2e56"
                                                                            tag="div"><_Builtin.Block tag="div"><_Builtin.Strong>{"Guides"}</_Builtin.Strong></_Builtin.Block><_Builtin.Block className="paragraph_small text-color_secondary" tag="div">{"Simple care how-tos."}</_Builtin.Block></_Builtin.Block></_Builtin.Link></_Builtin.ListItem><_Builtin.ListItem
                                                                    className="margin-bottom_none"
                                                                    id="w-node-_0d6c7e72-58f3-41f6-b958-6f64d13bf846-d13bf7fb"><_Builtin.Link
                                                                        button={false}
                                                                        block="inline"
                                                                        options={{
                                                                            href: "#"
                                                                        }}><_Builtin.Block className="icon is-medium" tag="div"><_Builtin.DOM
                                                                                tag="svg"
                                                                                slot=""
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="100%"
                                                                                height="100%"
                                                                                viewBox="0 0 32 32"
                                                                                fill="currentColor"><_Builtin.DOM
                                                                                    tag="path"
                                                                                    slot=""
                                                                                    d="m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
                                                                                    stroke-linejoin="round" /></_Builtin.DOM></_Builtin.Block><_Builtin.Block
                                                                            className="w-node-_0d6c7e72-58f3-41f6-b958-6f64d13bf84b-d13bf7fb"
                                                                            id="w-node-_9f30640f-1f64-d0c6-60e9-e2b460cf1f52-ad6d2e56"
                                                                            tag="div"><_Builtin.Block tag="div"><_Builtin.Strong>{"FAQs"}</_Builtin.Strong></_Builtin.Block><_Builtin.Block className="paragraph_small text-color_secondary" tag="div">{"Quick answers for families."}</_Builtin.Block></_Builtin.Block></_Builtin.Link></_Builtin.ListItem><_Builtin.ListItem
                                                                    className="margin-bottom_none"
                                                                    id="w-node-_0d6c7e72-58f3-41f6-b958-6f64d13bf851-d13bf7fb"><_Builtin.Link
                                                                        button={false}
                                                                        block="inline"
                                                                        options={{
                                                                            href: "#"
                                                                        }}><_Builtin.Block className="icon is-medium" tag="div"><_Builtin.DOM
                                                                                tag="svg"
                                                                                slot=""
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="100%"
                                                                                height="100%"
                                                                                viewBox="0 0 32 32"
                                                                                fill="currentColor"><_Builtin.DOM
                                                                                    tag="path"
                                                                                    slot=""
                                                                                    d="m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
                                                                                    stroke-linejoin="round" /></_Builtin.DOM></_Builtin.Block><_Builtin.Block
                                                                            className="w-node-_0d6c7e72-58f3-41f6-b958-6f64d13bf856-d13bf7fb"
                                                                            id="w-node-_9f30640f-1f64-d0c6-60e9-e2b460cf1f5d-ad6d2e56"
                                                                            tag="div"><_Builtin.Block tag="div"><_Builtin.Strong>{"Articles"}</_Builtin.Strong></_Builtin.Block><_Builtin.Block className="paragraph_small text-color_secondary" tag="div">{"Aging tips and advice."}</_Builtin.Block></_Builtin.Block></_Builtin.Link></_Builtin.ListItem></_Builtin.List></_Builtin.Block><_Builtin.Block id="w-node-_0d6c7e72-58f3-41f6-b958-6f64d13bf85c-d13bf7fb" tag="div"><_Builtin.Block className="eyebrow" tag="div">{"Support"}</_Builtin.Block><_Builtin.List tag="ul" role="list" unstyled={true}><_Builtin.ListItem
                                                                    className="margin-bottom_none"
                                                                    id="w-node-_0d6c7e72-58f3-41f6-b958-6f64d13bf860-d13bf7fb"><_Builtin.Link
                                                                        button={false}
                                                                        block="inline"
                                                                        options={{
                                                                            href: "#"
                                                                        }}><_Builtin.Block className="icon is-medium" tag="div"><_Builtin.DOM
                                                                                tag="svg"
                                                                                slot=""
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="100%"
                                                                                height="100%"
                                                                                viewBox="0 0 32 32"
                                                                                fill="currentColor"><_Builtin.DOM
                                                                                    tag="path"
                                                                                    slot=""
                                                                                    d="m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
                                                                                    stroke-linejoin="round" /></_Builtin.DOM></_Builtin.Block><_Builtin.Block
                                                                            className="w-node-_0d6c7e72-58f3-41f6-b958-6f64d13bf865-d13bf7fb"
                                                                            id="w-node-_246168ec-5422-2d22-c1a6-e8b7eb4d77d8-ad6d2e56"
                                                                            tag="div"><_Builtin.Block tag="div"><_Builtin.Strong>{"Contact Us"}</_Builtin.Strong></_Builtin.Block><_Builtin.Block className="paragraph_small text-color_secondary" tag="div">{"Friendly help is here."}</_Builtin.Block></_Builtin.Block></_Builtin.Link></_Builtin.ListItem><_Builtin.ListItem
                                                                    className="margin-bottom_none"
                                                                    id="w-node-_0d6c7e72-58f3-41f6-b958-6f64d13bf86b-d13bf7fb"><_Builtin.Link
                                                                        button={false}
                                                                        block="inline"
                                                                        options={{
                                                                            href: "#"
                                                                        }}><_Builtin.Block className="icon is-medium" tag="div"><_Builtin.DOM
                                                                                tag="svg"
                                                                                slot=""
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="100%"
                                                                                height="100%"
                                                                                viewBox="0 0 32 32"
                                                                                fill="currentColor"><_Builtin.DOM
                                                                                    tag="path"
                                                                                    slot=""
                                                                                    d="m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
                                                                                    stroke-linejoin="round" /></_Builtin.DOM></_Builtin.Block><_Builtin.Block
                                                                            className="w-node-_0d6c7e72-58f3-41f6-b958-6f64d13bf870-d13bf7fb"
                                                                            id="w-node-_246168ec-5422-2d22-c1a6-e8b7eb4d77e3-ad6d2e56"
                                                                            tag="div"><_Builtin.Block tag="div"><_Builtin.Strong>{"Community"}</_Builtin.Strong></_Builtin.Block><_Builtin.Block className="paragraph_small text-color_secondary" tag="div">{"Join family discussions."}</_Builtin.Block></_Builtin.Block></_Builtin.Link></_Builtin.ListItem><_Builtin.ListItem
                                                                    className="margin-bottom_none"
                                                                    id="w-node-_0d6c7e72-58f3-41f6-b958-6f64d13bf876-d13bf7fb"><_Builtin.Link
                                                                        button={false}
                                                                        block="inline"
                                                                        options={{
                                                                            href: "#"
                                                                        }}><_Builtin.Block className="icon is-medium" tag="div"><_Builtin.DOM
                                                                                tag="svg"
                                                                                slot=""
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="100%"
                                                                                height="100%"
                                                                                viewBox="0 0 32 32"
                                                                                fill="currentColor"><_Builtin.DOM
                                                                                    tag="path"
                                                                                    slot=""
                                                                                    d="m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
                                                                                    stroke-linejoin="round" /></_Builtin.DOM></_Builtin.Block><_Builtin.Block
                                                                            className="w-node-_0d6c7e72-58f3-41f6-b958-6f64d13bf87b-d13bf7fb"
                                                                            id="w-node-_246168ec-5422-2d22-c1a6-e8b7eb4d77ee-ad6d2e56"
                                                                            tag="div"><_Builtin.Block tag="div"><_Builtin.Strong>{"Events"}</_Builtin.Strong></_Builtin.Block><_Builtin.Block className="paragraph_small text-color_secondary" tag="div">{"Workshops and classes."}</_Builtin.Block></_Builtin.Block></_Builtin.Link></_Builtin.ListItem></_Builtin.List></_Builtin.Block></_Builtin.Grid></_Builtin.ListItem><_Builtin.ListItem
                                                    className="flex_horizontal w-node-_0d6c7e72-58f3-41f6-b958-6f64d13bf881-d13bf7fb"
                                                    id="w-node-_016f5a0a-5b63-edde-82c5-e2b2ad6d2ede-ad6d2e56"><_Builtin.Link
                                                        className="card-link is-inverse flex-child_expand"
                                                        button={false}
                                                        block="inline"
                                                        options={{
                                                            href: "#"
                                                        }}><_Builtin.Block className="card_body" tag="div"><_Builtin.Block className="heading_h3" tag="div">{"Navigate care with confidence"}</_Builtin.Block><_Builtin.Paragraph className="paragraph_small text-color_inverse-secondary">{"Find tools and advice for every step."}</_Builtin.Paragraph><_Builtin.Block className="margin_top-auto" tag="div"><_Builtin.Block className="button-group" tag="div"><_Builtin.Block className="text-button is-secondary" tag="div"><_Builtin.Block tag="div">{"Learn more"}</_Builtin.Block><_Builtin.Block className="button_icon" tag="div"><_Builtin.DOM
                                                                                tag="svg"
                                                                                slot=""
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="100%"
                                                                                height="100%"
                                                                                viewBox="0 0 16 16"
                                                                                fill="none"><_Builtin.DOM
                                                                                    tag="path"
                                                                                    slot=""
                                                                                    d="M2 8H14.5M14.5 8L8.5 2M14.5 8L8.5 14"
                                                                                    stroke="currentColor"
                                                                                    stroke-width="2"
                                                                                    stroke-linejoin="round" /></_Builtin.DOM></_Builtin.Block></_Builtin.Block></_Builtin.Block></_Builtin.Block></_Builtin.Block></_Builtin.Link></_Builtin.ListItem></_Builtin.List></_Builtin.Block></_Builtin.DropdownList></_Builtin.DropdownWrapper></_Builtin.ListItem><_Builtin.ListItem><_Builtin.Link
                                    className="nav_link"
                                    button={false}
                                    block="inline"
                                    options={{
                                        href: "#"
                                    }}><_Builtin.Block tag="div">{"About"}</_Builtin.Block></_Builtin.Link></_Builtin.ListItem><_Builtin.ListItem><_Builtin.Link
                                    className="nav_link"
                                    button={false}
                                    block="inline"
                                    options={{
                                        href: "#"
                                    }}><_Builtin.Block tag="div">{"Blog"}</_Builtin.Block></_Builtin.Link></_Builtin.ListItem><_Builtin.ListItem><_Builtin.DropdownWrapper
                                    data-w-id="0d6c7e72-58f3-41f6-b958-6f64d13bf899"
                                    tag="div"
                                    delay={0}
                                    hover={false}><_Builtin.DropdownToggle className="nav_link" tag="div"><_Builtin.Block tag="div">{"Support"}</_Builtin.Block><_Builtin.Icon
                                            widget={{
                                                type: "icon",
                                                icon: "dropdown-toggle"
                                            }} /></_Builtin.DropdownToggle><_Builtin.DropdownList tag="div"><_Builtin.Block className="nav-menu_dropdown-list-wrapper" tag="div"><_Builtin.List
                                                className="flex_vertical margin-bottom_none"
                                                tag="ul"
                                                role="list"
                                                unstyled={true}><_Builtin.ListItem className="margin-bottom_none"><_Builtin.Link
                                                        button={false}
                                                        block="inline"
                                                        options={{
                                                            href: "#"
                                                        }}><_Builtin.Block tag="div">{"Help Center"}</_Builtin.Block></_Builtin.Link></_Builtin.ListItem><_Builtin.ListItem className="margin-bottom_none"><_Builtin.Link
                                                        button={false}
                                                        block="inline"
                                                        options={{
                                                            href: "#"
                                                        }}><_Builtin.Block tag="div">{"Contact"}</_Builtin.Block></_Builtin.Link></_Builtin.ListItem></_Builtin.List></_Builtin.Block></_Builtin.DropdownList></_Builtin.DropdownWrapper></_Builtin.ListItem></_Builtin.List></_Builtin.NavbarMenu><_Builtin.Block className="button-group margin-top_none" tag="div"><_Builtin.Link
                            className="button"
                            button={false}
                            block="inline"
                            options={{
                                href: "#"
                            }}><_Builtin.Block tag="div">{"Get started"}</_Builtin.Block></_Builtin.Link></_Builtin.Block></_Builtin.Block><_Builtin.NavbarButton className="nav_mobile-menu-button" tag="div"><_Builtin.Block className="icon" tag="div"><_Builtin.DOM
                            tag="svg"
                            slot=""
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"><_Builtin.DOM
                                tag="g"
                                slot=""
                                _class="nc-icon-wrapper"
                                stroke-linecap="square"
                                stroke-linejoin="miter"
                                stroke-width="1.5"
                                fill="none"
                                stroke="currentColor"
                                stroke-miterlimit="10"><_Builtin.DOM tag="line" slot="" x1="1" y1="12" x2="23" y2="12" stroke="currentColor" /><_Builtin.DOM tag="line" slot="" x1="1" y1="5" x2="23" y2="5" /><_Builtin.DOM tag="line" slot="" x1="1" y1="19" x2="23" y2="19" /></_Builtin.DOM></_Builtin.DOM></_Builtin.Block></_Builtin.NavbarButton></_Builtin.NavbarWrapper></_Component>
    );
}