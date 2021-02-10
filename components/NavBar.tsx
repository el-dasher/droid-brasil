import { useState } from 'react';
import Link from 'next/link';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import HomeIcon from '@material-ui/icons/Home';

export default function PersistentDrawerRight() {
  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">OSU!DROID BRASIL</Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="persistent" anchor="right" open={open}>
        <IconButton onClick={handleDrawer}>
          <ChevronRightIcon />
        </IconButton>
        <Divider />
        <List>
          <div>
            <Link href={`/`}>
              <Button style={{ border: 0 }}>
                <ListItem button>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={'HOME'} />
                </ListItem>
              </Button>
            </Link>
          </div>
          {['Rank'].map((text) => {
            const text_lower = text.toLowerCase();
            return (
              <Link href={`/${text_lower}`} key={text}>
                <Button style={{ border: 0 }}>
                  <ListItem button>
                    <ListItemIcon>
                      {text_lower === 'rank' && <LibraryBooksIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                </Button>
              </Link>
            );
          })}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}
