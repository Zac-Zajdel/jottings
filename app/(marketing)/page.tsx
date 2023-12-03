"use client"

import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { motion } from "framer-motion"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import VerticalCarouselCard from "@/components/landing/vertical-carousel-card"

export default function IndexPage() {
  const [activeTab, setActiveTab] = useState('jots')

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-28 mx-10">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.2,
              delay: 0.3,
              ease: [0, 0.71, 0.2, 1.01]
            }}
          >
            <Link
              href="/changelog/release-v1.3.0"
              className="flex items-center h-8 px-4 rounded-full bg-primary hover:bg-primary/90 text-core text-sm font-medium"
            >
              Release v1.3.0 is Here!
              <Icons.chevronRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-8xl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.2,
              delay: 0.3,
              ease: [0, 0.71, 0.2, 1.01]
            }}
          >
            Jottings
          </motion.div>

          <motion.p
            className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 mt-3"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01]
            }}
          >
            Elevate Your Daily Project Management.
            <br />
            Streamline Tasks with a Unified Workflow and Centralized Data Hub.
          </motion.p>

          <motion.div
            className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 mt-3"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01]
            }}
          >
            <Link
              href="/login"
              className={cn(
                "mt-6",
                buttonVariants({ size: "lg" })
              )}
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="ml-10 mr-0 3xl:mr-10">
        <div className="overflow-hidden py-12 xl:py-12">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                delay: 1,
                ease: [0, 0.71, 0.2, 1.01]
              }}
            >
              <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-2 items-center">
                <div className="lg:pr-8">
                  <div className="lg:max-w-lg">
                    <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Features</h2>
                    <p className="mt-6 text-xl sm:text-2xl text-muted-foreground">Opt-in capabilities to facilitate the most complex multi-team projects.</p>
                    <div className="mt-8 relative max-w-xl lg:max-w-none">
                      <dl className="grid grid-cols-1 auto-rows-fr text-lg leading-normal">
                        <VerticalCarouselCard
                          heading="Jots"
                          description="&nbsp;- Empower your work with a modern editor, enhancing your ability to craft and refine Jots seamlessly."
                          icon={Icons.file}
                          isActive={activeTab === 'jots'}
                          setActiveTab={() => setActiveTab('jots')}
                        />
                        <VerticalCarouselCard
                          heading="Templates"
                          description="&nbsp;- Elevate your Jots with curated templates, providing a foundation for building impactful content effortlessly."
                          icon={Icons.template}
                          isActive={activeTab === 'templates'}
                          setActiveTab={() => setActiveTab('templates')}
                        />
                        <VerticalCarouselCard
                          heading="Coming Soon..."
                          description="&nbsp;Foster collaboration efficiently, enabling you to share and collaborate on content."
                          icon={Icons.group}
                          isActive={activeTab === 'teams'}
                          setActiveTab={() => setActiveTab('teams')}
                        />
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-secondary w-[48rem] overflow-hidden max-w-none rounded-lg shadow-2xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0">
                  <Image
                    className={cn(
                      "dark:hidden",
                      {
                        'hidden': activeTab !== 'jots',
                        'block': activeTab === 'jots'
                      }
                    )}
                    src="/images/landing/jots-light.png"
                    alt="Jot Light"
                    width={1200}
                    height={600}
                    priority={true}
                  />
                  <Image
                    className={cn(
                      "hidden",
                      {
                        'hidden': activeTab !== 'jots',
                        'dark:block': activeTab === 'jots'
                      }
                    )}
                    src="/images/landing/jots-dark.png"
                    alt="Jot Dark"
                    width={1200}
                    height={600}
                    priority={true}
                  />
                  <Image
                    className={cn(
                      "dark:hidden",
                      {
                        'hidden': activeTab !== 'templates',
                        'block': activeTab === 'templates'
                      }
                    )}
                    src="/images/landing/templates-light.png"
                    alt="Jot Template Light"
                    width={1200}
                    height={600}
                    priority={true}
                  />
                  <Image
                    className={cn(
                      "hidden",
                      {
                        'hidden': activeTab !== 'templates',
                        'dark:block': activeTab === 'templates'
                      }
                    )}
                    src="/images/landing/templates-dark.png"
                    alt="Jot Template Dark"
                    width={1200}
                    height={600}
                    priority={true}
                  />
                  <Image
                    className={cn(
                      "dark:hidden",
                      {
                        'hidden': activeTab !== 'teams',
                        'block': activeTab === 'teams'
                      }
                    )}
                    src="/images/landing/teams-light.png"
                    alt="Teams Light"
                    width={1200}
                    height={600}
                    priority={true}
                  />
                  <Image
                    className={cn(
                      "hidden",
                      {
                        'hidden': activeTab !== 'teams',
                        'dark:block': activeTab === 'teams'
                      }
                    )}
                    src="/images/landing/teams-dark.png"
                    alt="Teams Dark"
                    width={1200}
                    height={600}
                    priority={true}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
