import { BookOpen } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
        <div>
            {/* Footer */}
            <footer className="border-t border-border bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <span className="font-bold">LMSC E-Learning</span>
                        </div>
                        <p className="text-muted-foreground text-xs md:text-sm">
                            © 2025 London Maths & Science College. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer