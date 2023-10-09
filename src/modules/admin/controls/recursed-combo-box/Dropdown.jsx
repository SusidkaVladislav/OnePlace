import React, { useState, useRef, cloneElement, Children, createElement, forwardRef } from "react";

import Menu from "@mui/material/Menu";


const Dropdown = (props, ref) =>
{
    const {
        trigger,
        menu,
        keepOpen: keepOpenGlobal,
        isOpen: controlledIsOpen,
        onOpen: onControlledOpen,
        minWidth
    } = props;

    const [isInternalOpen, setInternalOpen] = useState(null);

    const isOpen = controlledIsOpen || isInternalOpen;

    let anchorRef = useRef(null);
    if (ref)
    {
        anchorRef = ref;
    }

    const handleOpen = (event) =>
    {
        event.stopPropagation();

        if (menu.length)
        {
            onControlledOpen
                ? onControlledOpen(event.currentTarget)
                : setInternalOpen(event.currentTarget);
        }
    };

    const handleClose = (event) =>
    {
        event.stopPropagation();

        if (anchorRef.current && anchorRef.current.contains(event.target))
        {
            return;
        }

        handleForceClose();
    };

    const handleForceClose = () =>
    {
        onControlledOpen ? onControlledOpen(null) : setInternalOpen(null);
    };

    const renderMenu = (menuItem, index) =>
    {
        const { keepOpen: keepOpenLocal, ...props } = menuItem.props;

        let extraProps = {};
        if (props.menu)
        {
            extraProps = {
                parentMenuOpen: isOpen
            };
        }

        return createElement(menuItem.type, {
            ...props,
            key: index,
            ...extraProps,
            onClick: (event) =>
            {
                event.stopPropagation();

                if (!keepOpenGlobal && !keepOpenLocal)
                {
                    handleClose(event);
                }

                if (menuItem.props.onClick)
                {
                    menuItem.props.onClick(event);
                }
            },
            children: props.menu
                ? Children.map(props.menu, renderMenu)
                : props.children
        });
    };

    return (
        <>
            {cloneElement(trigger, {
                onClick: isOpen ? handleForceClose : handleOpen,
                ref: anchorRef
            })}

            <Menu
                PaperProps={{ sx: { minWidth: minWidth ?? 0 } }}
                anchorEl={isOpen}
                open={!!isOpen}
                onClose={handleClose}
            >
                {Children.map(menu, renderMenu)}
            </Menu>
        </>
    );
}


export default forwardRef(Dropdown)





// export const DropdownMenuItem = styled(MenuItem)`
//   display: flex;
//   justify-content: space-between !important;

//   & > svg {
//     margin-left: 32px;
//   }
// `;

// export const DropdownNestedMenuItem = styled(NestedMenuItem)`
//   display: flex;
//   justify-content: space-between !important;

//   & > svg {
//     margin-left: 32px;
//   }
// `;
