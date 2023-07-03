import Image from 'next/image'
import styles from './page.module.css'
import Head from 'next/head'
import LogIn from './login/page'
import {redirect} from 'next/navigation'
import {cookies} from 'next/headers'

export default function Home() {
  if (cookies().get("isLoggedIn")?.value !== "true") {
    redirect("/login")
  }

  return (
   <>
    <h1>main page</h1>
   </>
  )
}
