<template>
  <div class="wrapper">
    <Navbar />
    <main>
      <Landing />
      <Githubplug />
      <Steps />
      <Languagesupport />
      <Nextbigthing />
      <Footer />
    </main>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import Landing from '~/components/Landing'
import Githubplug from '~/components/Githubplug'
import Steps from '~/components/Steps'
import Languagesupport from '~/components/Languagesupport'
import Nextbigthing from '~/components/Nextbigthing'
import Footer from '~/components/Footer'

export default {
  layout: 'default',
  components: { Navbar, Landing, Githubplug, Steps, Languagesupport, Nextbigthing, Footer }
}
</script>

<style>

</style>
