import { ClickAwayListener, Popper } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect } from 'react';

const useStyles = makeStyles({
    Popper: {
        minWidth: '250px',
        minHeight: '36px',
        maxHeight: '90vh',
        background: '#fff',
        borderRadius: '6px',
        zIndex: 100000,
        overflow: 'hidden',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    },
});

const Escape = ({ onEscape, children, ...props }) => {
    useEffect(() => {
        const listen = (event) => {
            if (event.key === 'Escape') {
                onEscape && onEscape();
            }
        };

        document.addEventListener('keydown', listen);
        return () => {
            document.removeEventListener('keydown', listen);
        };
    }, [onEscape]);
    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, props);
        }
        return child;
    });

    return childrenWithProps;
};

const CustomizePopper = ({ anchorEl, onClose, children }) => {
    const classes = useStyles();

    return (
        <Escape onEscape={onClose}>
            <ClickAwayListener onClickAway={onClose}>
                <Popper className={classes.Popper} open={Boolean(anchorEl)} anchorEl={anchorEl} placement='bottom-end'>
                    <>{children}</>
                </Popper>
            </ClickAwayListener>
        </Escape>
    );
};

export default CustomizePopper;
