import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axiosClient from "../../axios-client.js";
import styles from './HomePages.module.css'
import PageTitle from '../../components/HomeComponents/PageTitle'
import ListsContainer from '../../components/HomeComponents/ListsContainer'
import { FaPlus } from 'react-icons/fa'

const JobPostsPage = () => {

  const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true)

  useEffect( () => {
    setLoading(true)
    axiosClient.get('jobs/user-posts')
      .then((response) => {
        setJobs(response.data)
        setLoading(false)
      }).catch((error) => {
        console.error('Error fetching user job posts:', error);
      })
  }, [])

  return (
    <>
      <div className={styles["header-section"]}>
        {/* <!-- Welcome Section --> */}
        <PageTitle title="Job Posts" subtitle="See all the jobs you have posted." />
        <section className={styles["search-bar-section"]}>
          <div className={styles["post-bar-section"]}>
            <Link to='/hub/create-job' className={styles["post-bar-button"]} ><FaPlus />Post A Job</Link>
          </div>
        </section>
      </div>
      {(jobs <= 0 && !loading) && <h1 style={{margin:'20px', color:'white', fontSize:'1.5rem', fontWeight:'600'}}>Nothing has been posted yet.</h1>}
      <ListsContainer jobs={jobs} postPage={true}/>
    </>  
  )
}

export default JobPostsPage