import * as Radix from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { repositoryURL } from '@/lib/constants';
import { ApiError, type Response } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function Home() {
  const { data, error, isFetching } = useQuery<Response, ApiError>({
    async queryFn() {
      try {
        const response = await fetch(`${repositoryURL}/blog/me.json`);

        if (!response.ok)
          throw new ApiError(response.status, response.statusText);

        return await response.json();
      } catch (error: unknown) {
        throw new ApiError(500, (error as Error).message);
      }
    },
    queryKey: ['data']
  });

  const [articleFilter, setArticle] = useState('About');
  const [projectFilter, setProjectFilter] = useState('All');
  const [isAccordianOpen, setIsAccordianOpen] = useState(false);

  if (error)
    return (
      <main className='bg-smoky-black min-h-screen content-center justify-items-center space-y-4 text-white'>
        <h1 className='text-xl'>
          {error.status} | {error.message}
        </h1>
      </main>
    );

  if (isFetching)
    return (
      <main className='bg-smoky-black min-h-screen content-center justify-items-center space-y-4 text-white'>
        <h1 className='text-xl'>Loading...</h1>
      </main>
    );

  if (!data) return;

  const filteredProjects = data.projects.filter(project =>
    projectFilter === 'All' ? true : project.category === projectFilter
  );

  return (
    <div className='bg-smoky-black min-h-screen gap-4 space-y-4 p-4 font-sans antialiased md:space-y-8 md:p-16 xl:grid xl:grid-flow-col xl:grid-cols-[15em_1fr] xl:gap-4 xl:space-y-0 xl:p-4'>
      <aside className='sidebar border-jet bg-eerie-black-2 shadow-shadow-1 space-y-4 rounded-3xl border p-4 sm:space-y-4 sm:p-6 md:space-y-6 md:p-8 xl:sticky xl:top-4 xl:w-auto xl:max-w-60 xl:space-y-4 xl:self-start xl:px-4 xl:pt-16'>
        <div className='sidebar_info relative z-10 grid grid-flow-col grid-cols-[5em_1fr] gap-4 sm:grid-cols-[5.5em_1fr] md:grid-cols-[7em_1fr] md:gap-8 xl:flex xl:flex-col xl:items-center xl:gap-4 xl:text-center'>
          <figure className='info_profile-box bg-bg-gradient-onyx rounded-3xl p-2'>
            <img
              alt={data.name}
              className='profile-box_img rounded-2xl'
              height={100}
              src={data.profilePicture}
              width={100}
            />
          </figure>
          <div className='info_content space-y-2 self-center'>
            <h1 className='content_name text-white-2 font-semibold sm:text-base md:text-base xl:text-2xl'>
              {data.name}
            </h1>
            <p className='content_title bg-onyx text-white-1 inline-block rounded-xl px-4 py-2 text-xs sm:text-sm md:text-sm'>
              {data.title}
            </p>
          </div>
          <button
            className="info_chevron focus shadow-shadow-2 hover:bg-bg-gradient-yellow-1 focus:bg-bg-gradient-yellow-1 absolute -top-4 -right-4 rounded-tr-3xl rounded-bl-3xl px-2 before:absolute before:inset-0 before:-z-10 before:block before:rounded-tr-3xl before:rounded-bl-3xl before:content-[''] sm:-top-6 sm:-right-6 md:-top-8 md:-right-8 md:px-8 md:py-2 xl:hidden"
            onClick={() =>
              setIsAccordianOpen(isAccordianOpen => !isAccordianOpen)
            }>
            <span className='chevron_label text-orange-yellow-crayola hidden text-sm md:inline'>
              Show Contacts
            </span>
            <Radix.ChevronDownIcon
              className={cn(
                'chevron_icon text-orange-yellow-crayola aspect-square h-7 w-10 md:hidden',
                isAccordianOpen && 'rotate-180'
              )}
            />
          </button>
        </div>
        <div
          className={cn(
            `sidebar_more-info space-y-4 xl:static xl:block xl:h-auto xl:w-auto xl:scale-100`,
            !isAccordianOpen && 'hidden'
          )}>
          <ul className='info_contact-list border-jet grid items-start gap-4 gap-y-4 border-t border-b py-4 sm:grid-cols-2 md:grid-cols-2 md:gap-8 md:gap-y-8 md:py-10 xl:grid-cols-1 xl:gap-4 xl:border-b-0 xl:py-4'>
            {Object.keys(data.contactDetails).map(_key => {
              const key = _key as keyof typeof data.contactDetails;
              return (
                <li
                  className='contact-list_item flex items-start gap-4 text-white md:gap-8 xl:gap-2 xl:px-4'
                  key={key}>
                  <div className="item_icon bg-border-gradient-onyx text-orange-yellow-crayola shadow-shadow-2 before:bg-eerie-black-1 relative z-10 aspect-square content-center rounded-lg p-2 before:absolute before:inset-px before:-z-10 before:block before:rounded-lg before:content-[''] sm:p-3 md:p-4">
                    {key === 'dob' && <Radix.CalendarIcon />}
                    {key === 'email' && <Radix.EnvelopeOpenIcon />}
                    {key === 'phone' && <Radix.IdCardIcon />}
                    {key === 'location' && <Radix.DrawingPinFilledIcon />}
                  </div>
                  <div className='item_info sm:space-y-1'>
                    <h2 className='key text-light-gray-70 text-xs capitalize sm:text-sm'>
                      {key}
                    </h2>
                    <p
                      className='value line-clamp-1 text-xs sm:text-sm xl:text-wrap xl:break-all'
                      title={data.contactDetails[key]}>
                      {data.contactDetails[key]}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className='info_social flex gap-4 sm:gap-6 md:gap-6 xl:justify-center'>
            <a className='text-light-gray-70' href={data.social.github}>
              <Radix.GitHubLogoIcon className='text-[5rem]' fontSize={20} />
            </a>
            <a className='text-light-gray-70' href={data.social.email}>
              <Radix.EnvelopeOpenIcon />
            </a>
            <a className='text-light-gray-70' href={data.social.discord}>
              <Radix.DiscordLogoIcon />
            </a>
            <a className='text-light-gray-70' href={data.social.website}>
              <Radix.Link2Icon />
            </a>
            <a className='text-light-gray-70' href={data.social.resume}>
              <Radix.FileTextIcon />
            </a>
          </div>
        </div>
      </aside>
      <main className='main-content text-app-primary border-jet bg-eerie-black-2 shadow-shadow-2 mb-12 rounded-3xl border p-4 md:p-8 xl:relative xl:col-start-2 xl:-col-end-1 xl:m-0 xl:w-auto xl:max-w-full'>
        <nav className='navbar border-jet shadow-shadow-2 fixed right-0 bottom-0 left-0 z-50 w-full rounded-t-2xl border bg-[#2b2b2cbf] backdrop-blur xl:absolute xl:top-0 xl:right-0 xl:bottom-auto xl:left-auto xl:w-auto xl:rounded-tl-none xl:rounded-bl-xl'>
          <ul className='navbar_list flex flex-wrap items-center justify-center xl:gap-4 xl:px-4'>
            {data.articleCategories.map((filter, index) => (
              <li
                className='list_item text-primary-foreground flex justify-center'
                key={index}>
                <button
                  className={cn(
                    'navbar-link text-light-gray hover:text-light-gray-70 focus-visible:text-light-gray-70 block px-2 py-4 text-xs transition-colors duration-300 ease-in sm:text-sm md:text-base xl:text-xl',
                    filter === articleFilter &&
                      'text-orange-yellow-crayola hover:text-orange-yellow-crayola focus-visible:text-orange-yellow-crayola'
                  )}
                  onClick={() => setArticle(filter)}>
                  {filter}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {articleFilter === 'About' && (
          <article className='main-content_about space-y-10'>
            <header className='about_header'>
              <h2 className="header_title text-white-2 after:bg-text-gradient-yellow relative text-2xl font-semibold capitalize after:absolute after:right-0 after:bottom-0 after:left-0 after:h-1 after:w-1/6 after:max-w-8 after:translate-y-4 after:rounded-full after:content-[''] md:text-3xl">
                About Me
              </h2>
            </header>
            <section className='about_about-me space-y-4'>
              {data.about.map((about, index) => (
                <p
                  className='text-white-1'
                  dangerouslySetInnerHTML={{ __html: about.content }}
                  key={index}
                />
              ))}
            </section>
            <section className='about_service space-y-4'>
              <h3 className='service_title text-white-1 text-2xl font-semibold'>
                What I am doing
              </h3>
              <ul className='service_list space-y-8 md:grid md:grid-cols-2 md:gap-4 md:space-y-0'>
                {data.services.map((service, index) => (
                  <li
                    className="service_item bg-border-gradient-onyx shadow-shadow-2 before:bg-bg-gradient-jet relative z-10 flex flex-col items-center justify-center gap-4 rounded-xl p-8 text-center before:absolute before:inset-px before:-z-10 before:rounded-xl before:content-[''] sm:flex-row sm:items-start sm:justify-start sm:p-6 sm:text-left"
                    key={index}>
                    <div className='item_icon-box'>
                      <img
                        alt={service.title}
                        className='aspect-square max-w-20'
                        src={service.image}
                      />
                    </div>
                    <div className='icon_content-box'>
                      <h4 className='content-box_category text-white-1 text-xl font-semibold'>
                        {service.category}
                      </h4>
                      <p className='content-box_title text-light-gray-70'>
                        {service.title}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            <section className='about_testimonial space-y-4'>
              <h3 className='testimonial_title text-2xl font-semibold text-white'>
                Projects
              </h3>
              <ul className='testimonial_list has-scrollbar flex gap-8 overflow-auto py-8 xl:grid xl:grid-flow-col xl:grid-cols-3 xl:gap-4 xl:overflow-x-auto'>
                {data.testimonials.map((testimonial, index) => (
                  <Dialog key={index}>
                    <DialogTrigger>
                      <li
                        className='testimonial_item min-w-80 text-left xl:min-w-0'
                        key={index}>
                        <div className="item_content-card before:bg-gradient-jet bg-border-gradient-onyx shadow-shadow-2 relative z-10 aspect-video overflow-visible rounded-xl p-4 text-balance before:absolute before:inset-0 before:-z-10 before:rounded-xl before:content-['']">
                          <figure className='content-card_avatar-box bg-bg-gradient-onyx absolute aspect-square max-w-16 -translate-y-10 rounded-xl'>
                            <img
                              alt={testimonial.name}
                              className='aspect-square min-w-12'
                              src={testimonial.image}
                            />
                          </figure>
                          <div className='content-card_text'>
                            <h4 className='h4 content-card_title mt-8 text-xl font-semibold text-white'>
                              {testimonial.name}
                            </h4>
                            <p className='text-light-gray-70 line-clamp-4'>
                              {testimonial.comment}
                            </p>
                          </div>
                        </div>
                      </li>
                    </DialogTrigger>
                    <DialogContent className='bg-eerie-black-2 text-white'>
                      <DialogHeader>
                        <DialogTitle className='text-white-1'>
                          {testimonial.name}
                        </DialogTitle>
                        <DialogDescription className='text-light-gray-70'>
                          {testimonial.comment}
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                ))}
              </ul>
            </section>
            <section className='about_client space-y-8'>
              <h3 className='client_title text-white-1 text-2xl font-semibold'>
                Tech Stack
              </h3>
              <ul className='client_list has-scrollbar flex gap-8 overflow-auto p-4 xl:grid xl:grid-flow-col xl:overflow-x-auto'>
                {data.clients.map((client, index) => (
                  <li className='client_item' key={index}>
                    <a href={client.website}>
                      <img
                        alt={client.name}
                        className='aspect-square min-w-20 xl:min-w-0'
                        src={client.image}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </article>
        )}
        {articleFilter === 'Resume' && (
          <article className='main-content_resume space-y-10'>
            <header className='resume_header'>
              <h2 className="header_title text-white-2 after:bg-text-gradient-yellow relative text-2xl font-semibold capitalize after:absolute after:right-0 after:bottom-0 after:left-0 after:h-1 after:w-1/6 after:max-w-8 after:translate-y-4 after:rounded-full after:content-[''] md:text-3xl">
                Resume
              </h2>
            </header>
            <section className='resume_experience space-y-4'>
              <h3 className='experience_title text-white-1 flex items-center gap-2 text-lg font-semibold'>
                <Radix.BookmarkIcon className='bg-border-gradient-onyx text-orange-yellow-crayola shadow-shadow-1 relative z-10 aspect-square h-8 w-8 rounded-lg p-2' />
                Experience
              </h3>
              <ol className='experience_list ms-10'>
                {data.timeline.experience.map((experience, index) => (
                  <li
                    className="list_item --after:absolute --after:-left-6 --after:top-0 --after:z-30 --after:h-[6px] --after:w-[6px] --after:-translate-x-1/2 --after:translate-y-4 --after:rounded-full --after:bg-text-gradient-yellow --after:shadow-shadow-6 --after:content-[''] text-white-1 before:bg-jet relative z-10 space-y-1 py-2 before:absolute before:bottom-0 before:-left-6 before:w-[1.5px] before:-translate-x-1/2 before:rounded-t-full before:content-['']"
                    key={index}>
                    <span className='item_bubble absolute top-4 -left-6 flex aspect-square w-3 -translate-x-1/2'>
                      <span
                        className={cn(
                          'absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75',
                          index === 0 && 'animate-ping'
                        )}></span>
                      <span className='bg-text-gradient-yellow relative inline-flex h-3 w-3 rounded-full'></span>
                    </span>
                    <h3 className='item_institution font-semibold capitalize'>
                      {experience.institution}
                    </h3>
                    <span className='item_duration text-vegas-gold block'>
                      {experience.duration}
                    </span>
                    <p className='item_description text-light-gray'>
                      {experience.description}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
            <section className='resume_education space-y-4'>
              <h3 className='education_title text-white-1 flex items-center gap-2 text-lg font-semibold'>
                <Radix.BookmarkIcon className='bg-border-gradient-onyx text-orange-yellow-crayola shadow-shadow-1 relative z-10 aspect-square h-8 w-8 rounded-lg p-2' />
                Education
              </h3>
              <ol className='education_list ms-10'>
                {data.timeline.education.map((education, index) => (
                  <li
                    className="list_item --after:animate-ping --after:absolute --after:-left-6 --after:top-0 --after:z-30 --after:h-[6px] --after:w-[6px] --after:-translate-x-1/2 --after:translate-y-4 --after:rounded-full --after:bg-text-gradient-yellow --after:shadow-shadow-6 --after:content-[''] text-white-1 before:bg-jet relative z-10 space-y-1 py-2 before:absolute before:bottom-0 before:-left-6 before:w-[1.5px] before:-translate-x-1/2 before:rounded-t-full before:content-['']"
                    key={index}>
                    <span className='item_bubble absolute top-4 -left-6 flex aspect-square w-3 -translate-x-1/2'>
                      <span
                        className={cn(
                          'absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75',
                          index === 0 && 'animate-ping'
                        )}></span>
                      <span className='bg-text-gradient-yellow relative inline-flex h-3 w-3 rounded-full'></span>
                    </span>

                    <h3 className='item_institution font-semibold capitalize'>
                      {education.institution}
                    </h3>

                    <span className='item_duration text-vegas-gold block'>
                      {education.duration}
                    </span>

                    <p className='item_description text-light-gray'>
                      {education.description}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
            <section className='resume_skill space-y-4'>
              <h3 className='skill_title text-white-1 flex items-center gap-2 text-lg font-semibold'>
                My Skills
              </h3>
              <ol className="skill_list before:shadow-2 bg-border-gradient-onyx shadow-shadow-2 relative z-10 cursor-pointer space-y-2 rounded-xl p-4 before:absolute before:inset-0 before:-z-10 before:rounded-xl before:content-['']">
                {data.skills.map((skill, index) => (
                  <li className='skills_item space-y-2' key={index}>
                    <div className='item_wrapper flex items-center gap-2'>
                      <h5 className='item_title text-white-1 text-sm font-semibold'>
                        {skill.title}
                      </h5>
                      <data
                        className='item_percentage text-light-gray'
                        value={skill.percentage}>
                        {skill.percentage}%
                      </data>
                    </div>
                    <div className='item_progressbar bg-jet h-2 rounded-full'>
                      <div
                        className='progressbar_fill bg-text-gradient-yellow h-full rounded-full'
                        style={{ width: `${skill.percentage}%` }}></div>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </article>
        )}
        {articleFilter === 'Portfolio' && (
          <article className='main-content_portfolio space-y-10'>
            <header className='portfolio_header'>
              <h2 className="header_title text-white-2 after:bg-text-gradient-yellow relative text-2xl font-semibold capitalize after:absolute after:right-0 after:bottom-0 after:left-0 after:h-1 after:w-1/6 after:max-w-8 after:translate-y-4 after:rounded-full after:content-[''] md:text-3xl">
                Portfolio
              </h2>
            </header>
            <section className='portfolio_section space-y-8'>
              <div className='section_project-filter md:hidden'>
                <Select
                  onValueChange={(filter: string | null) =>
                    setProjectFilter(filter as string)
                  }>
                  <SelectTrigger className='border-jet text-light-gray w-full rounded-xl border py-6 text-base focus:ring-0 focus-visible:ring-0'>
                    <SelectValue placeholder='Select Category' />
                  </SelectTrigger>
                  <SelectContent className='border-jet text-white-2 mt-2 rounded-xl border bg-[#1e1e1f] shadow-none'>
                    {data.projectCategories.map((category, index) => (
                      <SelectItem
                        className='text-light-gray focus:text-light-gray px-3 py-2 focus:rounded-lg focus:bg-[#323234]'
                        key={index}
                        value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='section_project-filter hidden md:block'>
                <ul className='project-list flex gap-4'>
                  {data.projectCategories.map((category, index) => (
                    <li
                      className={cn(
                        'project-item text-white-2 hover:text-light-gray-70 focus-visible:text-light-gray-70 duration-100 ease-in',
                        category === projectFilter &&
                          'text-orange-yellow-crayola hover:text-orange-yellow-crayola focus-visible:text-orange-yellow-crayola'
                      )}
                      key={index}>
                      <button
                        className='capitalize'
                        onClick={() => setProjectFilter(category)}>
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <ul className='section_project-list space-y-8 md:grid md:grid-cols-2 md:gap-8 md:space-y-0'>
                {filteredProjects.map((project, index) => (
                  <li className='project-list_item' key={index}>
                    <a className='' href={project.href}>
                      <figure className="item_image-box relative mb-4 h-80 overflow-hidden rounded-xl before:absolute before:inset-0 before:z-10 before:hidden before:rounded-xl before:bg-[#00000080] before:content-[''] hover:before:block">
                        <div className='image-box_icon-box bg-jet absolute top-1/2 left-1/2 z-20 hidden aspect-square -translate-x-1/2 -translate-y-1/2 rounded-xl p-4'>
                          <Radix.EyeOpenIcon className='text-orange-yellow-crayola' />
                        </div>
                        <img
                          alt={project.title}
                          className='image-box_img absolute inset-0 aspect-video h-full w-full object-cover object-center'
                          src={project.image}
                        />
                      </figure>
                      <h3 className='item_title text-white-2 text-base font-semibold'>
                        {project.category}
                      </h3>
                      <p className='item_category text-light-gray-70 text-sm'>
                        {project.title}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </article>
        )}
        {articleFilter === 'Blog' && (
          <article className='main-content_blog space-y-10'>
            <header className='blog_header'>
              <h2 className="header_title text-white-2 after:bg-text-gradient-yellow relative text-2xl font-semibold capitalize after:absolute after:right-0 after:bottom-0 after:left-0 after:h-1 after:w-1/6 after:max-w-8 after:translate-y-4 after:rounded-full after:content-[''] md:text-3xl">
                Blog
              </h2>
            </header>
            <section className='blog_section space-y-8'>
              <ul className='section_blog-list space-y-8 md:grid md:grid-cols-2 md:gap-8 md:space-y-0'>
                {data.blogs.map((blog, index) => (
                  <li className='blog-list_item' key={index}>
                    <a
                      className="bg-border-gradient-onyx shadow-shadow-4 before:border-white-1 before:bg-eerie-black-1 relative z-10 before:absolute before:inset-0 before:-z-10 before:block before:rounded-xl before:content-['']"
                      href={blog.href}>
                      <figure className="item_image-box relative mb-4 aspect-video overflow-hidden rounded-xl before:absolute before:inset-0 before:z-10 before:hidden before:rounded-xl before:bg-[#00000080] before:content-[''] hover:before:block">
                        <div className='image-box_icon-box bg-jet absolute top-1/2 left-1/2 z-20 hidden aspect-square -translate-x-1/2 -translate-y-1/2 rounded-xl p-4'>
                          <Radix.EyeOpenIcon className='text-orange-yellow-crayola' />
                        </div>
                        <img
                          alt={blog.title}
                          className='image-box_img absolute inset-0'
                          src={blog.image}
                        />
                      </figure>
                      <div className='item_content space-y-2 rounded-b-xl p-4'>
                        <span className='item_date text-light-gray-70 flex items-center gap-2 text-sm'>
                          {blog.author}
                          <strong className='item_dot bg-light-gray-70 aspect-square w-1.5 rounded-full'></strong>
                          {blog.date}
                        </span>
                        <h3 className='item_title text-white-2 text-lg font-semibold'>
                          {blog.title}
                        </h3>
                        <p className='item_description text-light-gray-70 text-sm'>
                          {blog.description}
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </article>
        )}
        {articleFilter === 'Contact' && (
          <article className='main-content_contact space-y-10'>
            <header className='contact_header'>
              <h2 className="header_title text-white-2 after:bg-text-gradient-yellow relative text-2xl font-semibold capitalize after:absolute after:right-0 after:bottom-0 after:left-0 after:h-1 after:w-1/6 after:max-w-8 after:translate-y-4 after:rounded-full after:content-[''] md:text-3xl">
                Contact
              </h2>
            </header>
            <section className='contact_mapbox border-jet h-72 overflow-hidden rounded-xl border'>
              <figure className='h-full'>
                <iframe
                  className='h-full w-full max-w-full grayscale invert'
                  loading='lazy'
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111835.38495511685!2d78.76755229999999!3d28.843153450000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390afbea2f5646c9%3A0xb8c97ce4e95398db!2sMoradabad%2C%20Uttar%20Pradesh%2C%20India!5e0!3m2!1sen!2sbd!4v1723553915153!5m2!1sen!2sbd'></iframe>
              </figure>
            </section>
            <section className='contact_form space-y-4'>
              <h3 className='form_form-title text-white-2 text-base font-semibold'>
                Contact Form
              </h3>
              <form className='contact_form-form flex flex-col gap-4'>
                <div className='form_input-wrapper space-y-4'>
                  <input
                    className='input-wrapper_input border-jet text-white-2 focus:border-bittersweet-shimmer w-full rounded-xl border bg-transparent px-5 py-3 text-sm font-semibold outline-none'
                    name='fullname'
                    placeholder='Full name'
                    required
                    type='text'
                  />
                  <input
                    className='input-wrapper_input border-jet text-white-2 focus:border-bittersweet-shimmer w-full rounded-xl border bg-transparent px-5 py-3 text-sm font-semibold outline-none'
                    name='email'
                    placeholder='Email address'
                    required
                    type='email'
                  />
                </div>
                <textarea
                  className='form-input border-jet text-white-2 focus:border-bittersweet-shimmer rounded-xl border bg-transparent px-5 py-3 text-sm font-semibold outline-none'
                  name='message'
                  placeholder='Your Message'
                  required
                />
                <button
                  className="form_btn before:bg-gradient-onyx bg-border-gradient-onyx text-orange-yellow-crayola shadow-shadow-3 relative z-10 flex items-center justify-center gap-4 rounded-xl p-4 font-semibold capitalize before:absolute before:inset-0 before:-z-10 before:block before:rounded-xl before:content-['']"
                  type='submit'>
                  <Radix.PaperPlaneIcon className='inline-block h-5 w-5' />
                  <span>Send Message</span>
                </button>
              </form>
            </section>
          </article>
        )}
      </main>
    </div>
  );
}
