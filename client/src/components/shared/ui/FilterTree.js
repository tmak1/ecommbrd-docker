import React, { useState, useEffect } from 'react';

import categories from '../../../categories';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
    '&$checked': {
      color: 'rgba(0,0,0,1.0)',
    },
    checked: {},
  },
  itemDiv: {
    display: 'flex',
    alignItems: 'center',
    '& > *': { marginLeft: 0 },
    [theme.breakpoints.down('lg')]: {
      display: 'flex',
      flexDirection: 'row',
    },
  },
}));

const CheckboxComp = withStyles({
  root: {
    '&$checked': {
      color: '#000',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const getCategories = () =>
  categories.reduce((acc, curr) => {
    return { ...acc, [curr]: false };
  }, {});

const FilterTree = ({ reset, setFilters }) => {
  const classes = useStyles();
  const [checked, setChecked] = useState(getCategories());
  const handleChange = (event) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
  };
  useEffect(() => {
    const filterCategories = Object.entries(checked)
      .map(([key, val]) => (val ? key : null))
      .filter((category) => category !== null);
    setFilters(filterCategories);
  }, [checked, setFilters]);

  useEffect(() => {
    if (reset) {
      setChecked(getCategories);
    }
  }, [reset]);

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      defaultExpanded={['1']}
    >
      <TreeItem nodeId="1" label="Category">
        {categories.map((category, index) => (
          <div key={index} className={classes.itemDiv}>
            <CheckboxComp
              checked={checked[category]}
              name={category}
              onChange={handleChange}
            />
            <TreeItem nodeId={String(index + 2)} label={category} />
          </div>
        ))}
      </TreeItem>
    </TreeView>
  );
};

export default FilterTree;
