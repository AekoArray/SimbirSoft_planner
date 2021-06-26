import {useCallback, useContext} from "react"
import {Redirect, useHistory} from "react-router-dom"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import {makeStyles} from "@material-ui/core/styles"
import authService from "../../services/authService"
import {AuthContext} from "../../Context/Auth"

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function SignIn() {
  const history = useHistory()

  const onSubmit = useCallback(
    async event => {
      event.preventDefault()
      const {email, password} = event.target.elements
      try {
        await authService.login(email.value, password.value)
        history.push("/calendar")
      } catch (error) {
        alert(error)
      }
    },
    [history]
  )

  const classes = useStyles()
  const {currentUser} = useContext(AuthContext)

  if (currentUser) {
    return <Redirect to="/calendar" />
  }

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Вход
      </Typography>
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Почта"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Пароль"
          type="password"
          id="password"
          autoComplete="current-password"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Войти
        </Button>
      </form>
    </div>
  )
}
