"use client"

import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState('jots')

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 mx-10">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <motion.div
            className="box font-heading text-3xl sm:text-5xl md:text-6xl lg:text-8xl"
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
          <div className="container tab-container">
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
                      <div
                        className={cn(
                          "p-2 rounded-lg",
                          { 'bg-secondary': activeTab === 'jots' }
                        )}
                      >
                        <div
                          className="relative pl-9 pr-3 rounded-lg py-4"
                          onMouseOver={() => setActiveTab('jots')}
                        >
                          <dt
                            className={cn(
                              "inline font-semibold",
                              { 'bg-secondary dark:text-muted': activeTab === 'jots' }
                            )}
                          >
                            <Icons.file className="h-6 w-6 icon-xl absolute left-0 top-4 text-accent-400" />
                            Jots
                          </dt>
                          <dd
                            className={cn(
                              "inline text-muted-foreground",
                              { 'text-muted-foreground dark:text-muted': activeTab === 'jots' }
                            )}
                          >
                            &nbsp;- Empower your work with a modern editor, enhancing your ability to craft and refine Jots seamlessly.
                          </dd>
                        </div>
                      </div>

                      <div
                        className={cn(
                          "p-2 rounded-lg",
                          { 'bg-secondary': activeTab === 'templates' }
                        )}
                      >
                        <div
                          className="relative pl-9 pr-3 py-4"
                          onMouseOver={() => setActiveTab('templates')}
                        >
                          <dt
                            className={cn(
                              "inline font-semibold",
                              { 'bg-secondary dark:text-muted': activeTab === 'templates' }
                            )}
                          >
                            <Icons.template className="h-6 w-6 icon-xl absolute left-0 top-4 text-accent-400" />
                            Templates
                          </dt>
                          <dd
                            className={cn(
                              "inline text-muted-foreground",
                              { 'text-muted-foreground dark:text-muted': activeTab === 'templates' }
                            )}
                          >
                            &nbsp;- Elevate your Jots with curated templates, providing a foundation for building impactful content effortlessly.
                          </dd>
                        </div>
                      </div>

                      <div
                        className={cn(
                          "p-2 rounded-lg",
                          { 'bg-secondary': activeTab === 'teams' }
                        )}
                      >
                        <div
                          className="relative pl-9 pr-3 rounded-lg py-4"
                          onMouseOver={() => setActiveTab('teams')}
                        >
                          <dt
                            className={cn(
                              "inline font-semibold",
                              { 'bg-secondary dark:text-muted': activeTab === 'teams' }
                            )}
                          >
                            <Icons.group className="h-6 w-6 icon-xl absolute left-0 top-4 text-accent-400" />
                            Coming Soon...
                          </dt>
                          <dd
                            className={cn(
                              "inline text-muted-foreground",
                              { 'text-muted-foreground dark:text-muted': activeTab === 'teams' }
                            )}
                          >
                            &nbsp;Foster collaboration efficiently, enabling you to share and collaborate on content.
                          </dd>
                        </div>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-secondary w-[48rem] overflow-hidden max-w-none rounded-lg shadow-2xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0">
                { activeTab == 'jots' &&
                  <>
                    <Image
                      className="block dark:hidden"
                      src="/images/landing/jots-light.png"
                      alt="Jot Template"
                      width={1200}
                      height={600}
                      priority={true}
                    />
                    <Image
                      className="hidden dark:block"
                      src="/images/landing/jots-dark.png"
                      alt="Jot Template"
                      width={1200}
                      height={600}
                      priority={true}
                    />
                  </>
                }
                { activeTab == 'templates' &&
                  <>
                    <Image
                      className="block dark:hidden"
                      src="/images/landing/templates-light.png"
                      alt="Jot Template"
                      width={1200}
                      height={600}
                      priority={true}
                    />
                    <Image
                      className="hidden dark:block"
                      src="/images/landing/templates-dark.png"
                      alt="Jot Template"
                      width={1200}
                      height={600}
                      priority={true}
                    />
                  </>
                }
                { activeTab == 'teams' &&
                  <>
                    <Image
                      className="block dark:hidden"
                      src="/images/landing/teams-light.png"
                      alt="Jot Template"
                      width={1200}
                      height={600}
                      priority={true}
                    />
                    <Image
                      className="hidden dark:block"
                      src="/images/landing/teams-dark.png"
                      alt="Jot Template"
                      width={1200}
                      height={600}
                      priority={true}
                    />
                  </>
                }
              </div>
            </div>
          </motion.div>
          
          </div>
        </div>
      </section>
    </>
  )
}
