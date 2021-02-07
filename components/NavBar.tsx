import { useState } from 'react';
import { useRouter } from 'next/router';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

export default function PersistentDrawerRight() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">OSU!DROID BRASIL</Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="persistent" anchor="right" open={open}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronRightIcon />
        </IconButton>
        <Divider />
        <List>
          {['Rank'].map((text) => {
            const text_lower = text.toLowerCase();
            return (
              <IconButton
                key={text}
                onClick={() => router.push(`/${text_lower}`)}
                style={{ border: 0 }}
              >
                <ListItem button key={text}>
                  <ListItemIcon>
                    {text_lower === 'rank' && <LibraryBooksIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </IconButton>
            );
          })}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}
